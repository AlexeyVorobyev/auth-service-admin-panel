import {FC, ReactNode} from 'react'
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client'
import {serverErrorAfterware} from './afterware/server-error-afterware.ts'
import {GLOBAL_CONFIG} from '../../globalConfig.ts'
import {setContext} from '@apollo/client/link/context'
import {
    ETokenAndExpiryLocalStorageKeys,
    getTokensAndExpiry,
    setTokensAndExpiry,
} from '../../components/function/auth-token-and-expiry.function.ts'
import {ApolloGetAuthRefreshDocument} from '../../types/graphql/graphql.ts'

const httpLink = createHttpLink({
    uri: GLOBAL_CONFIG.apiAuthServiceAddress,
})

const authLink = setContext((_, {headers}) => {
    console.log(parseInt(getTokensAndExpiry().accessExpiry!), Date.parse(new Date().toUTCString()))
    if (parseInt(getTokensAndExpiry().accessExpiry!) < Date.parse(new Date().toUTCString())) {
        defaultClient.query({
            query: ApolloGetAuthRefreshDocument,
            variables: {
                input: {
                    token: getTokensAndExpiry().refreshToken!,
                },
            },
        })
            .then((response) => {
                setTokensAndExpiry(response.data.auth.refresh)
                window.location.reload()
            })
            .catch(() => {
                localStorage.removeItem(ETokenAndExpiryLocalStorageKeys.accessToken)
                localStorage.removeItem(ETokenAndExpiryLocalStorageKeys.refreshToken)
                localStorage.removeItem(ETokenAndExpiryLocalStorageKeys.refreshExpiry)
                localStorage.removeItem(ETokenAndExpiryLocalStorageKeys.accessExpiry)
                window.location.reload()
            })
    }

    const token = localStorage.getItem(ETokenAndExpiryLocalStorageKeys.accessToken)

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const defaultClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(
        serverErrorAfterware.concat(
            httpLink,
        ),
    ),
})

interface IApolloProviderWithClientProps {
    children: ReactNode
}

export const ApolloProviderWithClient: FC<IApolloProviderWithClientProps> = ({children}) => (
    <ApolloProvider client={defaultClient}>
        {children}
    </ApolloProvider>
)
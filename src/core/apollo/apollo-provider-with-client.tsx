import { FC, ReactNode } from 'react'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { serverErrorAfterware } from './afterware/server-error-afterware.ts'
import { GLOBAL_CONFIG } from '../../globalConfig.ts'
import { setContext } from '@apollo/client/link/context'
import {
    ETokenAndExpiryLocalStorageKeys,
    getTokensAndExpiry,
    setTokensAndExpiry,
} from '../../components/function/auth-token-and-expiry.function.ts'
import { ApolloGetAuthRefreshDocument } from '../../types/graphql/graphql.ts'

const cache = new InMemoryCache()

const httpLink = createHttpLink({
    uri: GLOBAL_CONFIG.apiAuthServiceAddress,
})

const authLink = setContext((_, { headers }) => {
    if (getTokensAndExpiry().accessExpiry! < Date.now().toString() && getTokensAndExpiry().accessExpiry) {
        defaultClient.query({
            query: ApolloGetAuthRefreshDocument,
            variables: {
                input: {
                    token: getTokensAndExpiry().refreshToken!,
                },
            },
        }).then((response) => {
            setTokensAndExpiry(response.data.auth.refresh)
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
    cache,
    link: authLink.concat(
        serverErrorAfterware.concat(
            httpLink,
        ),
    ),
})

interface IApolloProviderWithClientProps {
    children: ReactNode
}

export const ApolloProviderWithClient: FC<IApolloProviderWithClientProps> = ({ children }) => (
    <ApolloProvider client={defaultClient}>
        {children}
    </ApolloProvider>
)
import { FC, ReactNode } from 'react'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { serverErrorAfterware } from './server-error-afterware.ts'
import { GLOBAL_CONFIG } from '../../globalConfig.ts'
import { setContext } from '@apollo/client/link/context'
import {
    ETokenProcessorPageSearchParams,
} from '../../components/page/token-processor/token-processor-page.component.tsx'

const cache = new InMemoryCache()

const httpLink = createHttpLink({
    uri: GLOBAL_CONFIG.apiAuthServiceAddress,
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(ETokenProcessorPageSearchParams.accessToken)

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

export const ApolloProviderWithClient: FC<IApolloProviderWithClientProps> = ({ children }) => {
    return (
        <ApolloProvider client={defaultClient}>
            {children}
        </ApolloProvider>
    )
}
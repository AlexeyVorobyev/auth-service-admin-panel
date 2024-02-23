import { api } from './api'
import { GLOBAL_CONFIG } from '../../../globalConfig.ts'
import { TSignInPayload, TSignInResponse } from './types/auth.ts'
import { TEventEntity, TEventPatch, TEventPost, TEventsPayload, TEventsResponse } from './types/events.ts'
import { TEntityWithId } from './types/types.ts'
import { constructURLWithQuery } from '../functions/constructURLWithQuery.ts'

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<TSignInResponse, TSignInPayload>({
            query: (body) => ({
                url: `${GLOBAL_CONFIG.apiAuthServiceAddress}/auth/sign-in`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useSignInMutation,
} = authApi
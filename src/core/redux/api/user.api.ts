import { api } from './api'
import { GLOBAL_CONFIG } from '../../../globalConfig.ts'
import { TMeResponse, TUsersPayload, TUsersResponse } from './types/user.ts'
import { constructURLWithQuery } from '../functions/constructURLWithQuery.ts'
import { TEntityWithId } from './types/types.ts'

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        users: builder.query<TUsersResponse, TUsersPayload>({
            query: (settings) => ({
                url: constructURLWithQuery(`${GLOBAL_CONFIG.apiAuthServiceAddress}/user`, settings).toString(),
                method: 'GET',
            }),
            providesTags: ['users'],
        }),
        // event: builder.query<TEventEntity, TEntityWithId>({
        //     query: (settings) => ({
        //         url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/event/${settings.id}`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['events'],
        // }),
        userDelete: builder.mutation<undefined, TEntityWithId>({
            query: (settings) => ({
                url: `${GLOBAL_CONFIG.apiEventServiceAddress}/user/${settings.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['users'],
        }),
        // eventPost: builder.mutation<undefined, { body: TEventPost }>({
        //     query: (settings) => ({
        //         url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/event`,
        //         method: 'POST',
        //         body: settings.body,
        //     }),
        //     invalidatesTags: ['events'],
        // }),
        // eventPatch: builder.mutation<undefined, TEntityWithId & { body: TEventPatch }>({
        //     query: (settings) => ({
        //         url: `${GLOBAL_CONFIG.apiEventServiceAddress}/timemanager/event/${settings.id}`,
        //         method: 'PATCH',
        //         body: settings.body,
        //     }),
        //     invalidatesTags: ['events'],
        // }),
        me: builder.query<TMeResponse, undefined>({
            query: () => ({
                url: `${GLOBAL_CONFIG.apiAuthServiceAddress}/user/me`,
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useMeQuery,
    useLazyUsersQuery,
    endpoints: userEndpoints
} = userApi
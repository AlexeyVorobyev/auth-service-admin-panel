import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokensAndExpiry } from '../../../components/functions/authTokenAndExpiry.ts'

const disabledAuthTokenEndpoints = [
	'signIn'
]
export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['graphs', 'events', 'users'],
	baseQuery: fetchBaseQuery({
		prepareHeaders: (headers, api) => {
			if (disabledAuthTokenEndpoints.includes(api.endpoint)) {
				return headers
			}
			headers.set('Authorization', `Bearer ${getTokensAndExpiry().accessToken}`)
			return headers
		}
	}),
	endpoints: () => ({})
})



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({

        // base url of backend API
        baseUrl: 'http://localhost:8082/api',


        prepareHeaders: (headers, { getState }) => {

            const token = getState().auth.userToken
            if (token) {
                // include token in req header
                headers.set('authorization', `Bearer ${token}`)
                return headers
            }
        },
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: 'user/profile',
                method: 'GET',
            }),
        }),
    }),
})


export const { useGetUserDetailsQuery } = authApi
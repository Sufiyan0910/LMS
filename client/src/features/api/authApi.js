import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userloggedIn } from "../authSlice";

const USER_API = "http://localhost:8080/api/v1/user/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: 'register',
                method: 'POST',
                body: inputData
            })
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: 'login',
                method: 'POST',
                body: inputData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userloggedIn({ user: result.data.user }))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        loadUser: builder.query({ //get karne ke time mutation use nhi karte hain dot_query use karte hain
            query: () => ({
                url: 'profile',
                method: 'GET'
            })
        })
    })
})
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLoadUserQuery
} = authApi;

// {} -> Basic Query
// [] -> Mutation
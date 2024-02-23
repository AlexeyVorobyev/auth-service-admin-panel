import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as userReducer} from "./user/user.slice";
import {api} from "../api/api";
import {errorMiddleware} from "../api/errorMiddleware";
import {jwtMiddleware} from "../api/jwtMiddleware.ts"
import { useDispatch } from 'react-redux'

const reducers = combineReducers({
    user:userReducer,
    [api.reducerPath]: api.reducer
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export const store = configureStore({
    reducer:reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat([
            jwtMiddleware,
            api.middleware,
            errorMiddleware
        ])
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>



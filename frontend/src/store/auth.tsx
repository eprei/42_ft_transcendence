import { createSlice } from '@reduxjs/toolkit'

const authInitialState = { isLoggedIn: true }
const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
        },
        setAuthStatus(state, action) {
            state.isLoggedIn = action.payload;
        }
    },
})

export default authSlice

export const authActions = authSlice.actions

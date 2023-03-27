import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from '../../components/Authentication/AuthAction';

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    loading: false,
    userInfo: { id: "", username: "", roles: [] },
    userToken: localStorage.getItem("userToken"),
    error: "",
    success: false,
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state, action) {
            state.userToken = "";
            state.userInfo = { id: "", username: "", roles: [] };
            state.error = null;
            state.loading = false;
            state.success = false;
        }
    },
    extraReducers: {
        // register user
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // login user
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true
            const user = payload

            state.userInfo = { username: user.username, id: user.id, role: user.roles }
            console.log(state.userInfo);
            state.success = true
            //state.userToken = payload.userToken
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    },
})

export const { logout } = AuthSlice.actions
export const authReducer = AuthSlice.reducer;

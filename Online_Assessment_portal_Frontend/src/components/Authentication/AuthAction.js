import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ username, email, password, confirmPassword }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(
                `http://localhost:8082/api/auth/signup`,
                { username, email, password, confirmPassword },
                config
            )
        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        console.log(username);
        console.log(password);
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const info = await axios.post(
                `http://localhost:8082/api/auth/signin`,
                { username, password },
                config
            )
            console.log(`info----${info}`);
            // store user's token in local storage
            localStorage.setItem('userToken', info.accessToken)
            return info.data

        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
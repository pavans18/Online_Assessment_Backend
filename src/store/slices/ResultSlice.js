import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import baseUrl from "../../components/baseUrl";



export const getAllStudentsResult = createAsyncThunk(
    "results/getAllStudentsResult",
    async () => {
        return fetch(`${baseUrl}/apiresult/showAllResults`, {
            method: "GET",
        }).then((res) => res.json());

    });


export const getStudentsResultByUserName = createAsyncThunk(
    "results/getStudentsResultByUserName",
    async (username) => {
        return fetch(`${baseUrl}/apiresult/studentResultByName/${username}/result`, {
            method: "GET",
        }).then((res) => res.json());

    });


const ResultSlice = createSlice({
    name: "results",
    initialState: {
        post: [],
        loading: false,
        error: null,

    },
    extraReducers: {
        [getAllStudentsResult.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllStudentsResult.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [getAllStudentsResult.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        [getStudentsResultByUserName.pending]: (state, action) => {
            state.loading = true;
        },
        [getStudentsResultByUserName.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [getStudentsResultByUserName.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const resultReducer = ResultSlice.reducer;

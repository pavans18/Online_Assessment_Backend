import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getAllStudentsinAdminBoard = createAsyncThunk(
    "students/getAllStudentsinAdminBoard",
    async () => {
        return fetch(`http://localhost:8082/api/user/allUser`, {
            method: "GET",
        }).then((res) => res.json());

    });


const StudentSlice = createSlice({
    name: "students",
    initialState: {
        post: [],
        loading: false,
        error: null,

    },
    extraReducers: {
        [getAllStudentsinAdminBoard.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllStudentsinAdminBoard.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [getAllStudentsinAdminBoard.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const studentReducer = StudentSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../components/baseUrl";

export const getAllExams = createAsyncThunk(
    "exams/getAllExams",
    async () => {
        return fetch(`${baseUrl}/apiexam/showAvailableExams`, {
            method: "GET",
        }).then((res) => res.json());
    });

export const deleteExamById = createAsyncThunk(
    "exams/deleteExamById",
    async ({ id }) => {
        return fetch(`${baseUrl}/apiexam/deleteExam/${id}`, {
            method: "DELETE",
        }).then((res) => res.json());

    });

export const getDetailsOfParticularExam = createAsyncThunk(
    "exams/getDetailsOfParticularExam",
    async (id) => {

        return fetch(`${baseUrl}/apiexam/getParticularExam/${id}`).then((res) => res.json());
    });

export const addExam = createAsyncThunk(
    "exams/addExam",
    async ({ exam }) => {
        return fetch(`${baseUrl}/apiexam/addExam`, exam, {
            method: "POST",
        }).then((res) => res.json());

    });



const ExamSlice = createSlice({
    name: "exams",
    initialState: {
        post: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [getAllExams.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllExams.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [getAllExams.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        [deleteExamById.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteExamById.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [deleteExamById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        [getDetailsOfParticularExam.pending]: (state, action) => {
            state.loading = true;
        },
        [getDetailsOfParticularExam.fulfilled]: (state, action) => {
            state.loading = false;
            console.log(action.payload);
            state.post = action.payload;
        },
        [getDetailsOfParticularExam.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [addExam.pending]: (state, action) => {
            state.loading = true;
        },
        [addExam.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [addExam.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const examReducer = ExamSlice.reducer;

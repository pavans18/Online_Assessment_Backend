import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import baseUrl from "../../components/baseUrl";


export const getAllSubjects = createAsyncThunk(
    "subjects/getAllSubjects",
    async () => {
        return fetch(`${baseUrl}/apisubjects/showSubjects`, {
            method: "GET",
        }).then((res) => res.json());

    });

export const deleteSubjectByName = createAsyncThunk(
    "subjects/deleteSubjectByName",
    async (subName) => {

        await fetch(`${baseUrl}/apisubjects/subjectByName/${subName}`, {
            method: "DELETE",
        })
            .then((res) => res.json());

    });

export const addSubject = createAsyncThunk(
    "subjects/addSubject",
    async ({ values }) => {
        return fetch(`${baseUrl}/apisubjects/addSubject`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: values.name
            }),
        }).then((res) => res.json());

    });

const SubjectSlice = createSlice({
    name: "subjects",
    initialState: {
        post: [],
        loading: false,
        error: null,

    },
    extraReducers: {
        [getAllSubjects.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllSubjects.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [getAllSubjects.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        [deleteSubjectByName.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteSubjectByName.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
            console.log(action.payload);
        },
        [deleteSubjectByName.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;

        },

        [addSubject.pending]: (state, action) => {
            state.loading = true;
        },
        [addSubject.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [addSubject.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const subjectReducer = SubjectSlice.reducer;
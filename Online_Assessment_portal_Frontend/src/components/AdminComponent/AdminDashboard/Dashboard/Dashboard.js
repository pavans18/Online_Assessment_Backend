import style from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions } from "../../../../store/slices/QuestionSlice";
import { getAllExams } from "../../../../store/slices/ExamSlice";

function Dashboard() {

    const dispatch = useDispatch();

    const [exam, setExam] = useState("Exam List");
    const [question, setQuestion] = useState("Questions", "Updating....");

    let history = useHistory();


    //---------------------------to get all exams using redux ---------------------------

    useEffect(() => {
        dispatch(getAllExams());
    }, [dispatch])



    //----------------------------to get all questions using redux---------


    useEffect(() => {
        dispatch(getAllQuestions())
    }, [dispatch])


    //------------------------------------------------------------------------------

    function showExam() {
        history.push("/AdminDashboard/Exam");
    }

    function showQuestions() {
        history.push("/AdminDashboard/Question");
    }

    return (
        <>
            <div id={style.displayHeadingBox}>
                <h1>Dashboard</h1>
            </div>

            <div id={style.box1}>
                <p >{exam}</p>
                <button onClick={showExam}>View Details</button>
            </div>

            <div id={style.box2}>
                <p >{question}</p>
                <button onClick={showQuestions}>View Details</button>
            </div>

        </>
    );
}

export default Dashboard;
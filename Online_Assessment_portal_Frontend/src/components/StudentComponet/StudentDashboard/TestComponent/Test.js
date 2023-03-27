import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import style from "../StudentDashboard.module.css";
import baseUrl from "../../../baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsByExamId } from "../../../../store/slices/QuestionSlice";

function Test() {

    let history = useHistory();

    const [allQuestions, setAllQuestions] = useState();

    const dispatch = useDispatch();

    let { id } = useParams();

    const subName = useParams();

    let { category } = useParams();

    //const category = JSON.stringify(post.name)

    //const user = useSelector((state) => ({ ...state.auth }))


    // ----------------------Submitting answer Functionality----------

    const [answer, setAnswer] = useState({
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        answer5: "",
    });


    let correctAnswer = [];

    function onRadioButtonChange(e) {
        setAnswer({
            ...answer,
            [e.target.name]: e.target.value
        });


    }

    let count = 0;

    const user = useSelector((state) => state.auth.userInfo.username)

    //const username = JSON.parse(localStorage.getItem("user"));



    async function submitTest() {
        for (let i = 0; i < post.length; i++) {
            correctAnswer.push(post[i].answer);
        }


        let score = 0;
        let status = "";


        if (correctAnswer[0] === answer.answer1) score++;
        if (correctAnswer[1] === answer.answer2) score++;
        if (correctAnswer[2] === answer.answer3) score++;
        if (correctAnswer[3] === answer.answer4) score++;
        if (correctAnswer[4] === answer.answer5) score++;


        if (score >= 3) status = "Pass";
        else status = "Fail";




        var date = new Date();
        var d = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        var t = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        //const user = JSON.parse(localStorage.getItem("user"));



        let data = {
            "status": status,
            "score": score,
            "username": { "user": user },
            "examDate": d + " " + t,
            "totalMarks": "5",
            "totalQuestion": "5",
            "name": { "subName": category },
            "examId": { "id": id }       // exam id

            //"username": user,
            //"username": { "username": JSON.parse(localStorage.getItem("user")) }



            //"username": { "username": sessionStorage.getItem("user") }


        };

        await axios.post(`${baseUrl}/apiresult/addResult`, data);
        history.push("/StudentDashboard/Result/");

        console.log(data);

        //console.log(data.name);
        console.log(category);
        console.log(subName);
        //console.log((data.subName.name));

        //dispatch(postResult(data))


    }

    // -----------------------to get ALL Questions of Particular Exam-------------------------------


    const { post, loading } = useSelector((state) => ({ ...state.questions }));

    useEffect(() => {
        dispatch(getAllQuestionsByExamId({ id }))
        setAllQuestions(post.data);
    }, [id, dispatch])

    if (loading) {
        return <div> Loading Questions...</div>
    }

    return (
        <>
            <div id={style.displayBoxQuestionHeadingBox}>
                <h1>Answer all the questions</h1>
            </div>
            {

                post.map((data, i) => {
                    count++;
                    return (
                        <div id={style.displayBoxQuestionBox} key={i}>
                            <div id={style.divQuestion}> <span>{data.questionName}</span> </div>

                            <div>
                                <input onChange={(e) => onRadioButtonChange(e)} value={data.optionOne}
                                    id={style.option1} name={"answer" + count} type="radio" />
                                <label htmlFor="option1">{data.optionOne}</label>
                            </div>

                            <div>
                                <input onChange={(e) => onRadioButtonChange(e)} value={data.optionTwo}
                                    id={style.option2} name={"answer" + count} type="radio" />
                                <label htmlFor="option2">{data.optionTwo}</label>
                            </div>

                            <div>
                                <input onChange={(e) => onRadioButtonChange(e)} value={data.optionThree}
                                    id={style.option3} name={"answer" + count} type="radio" />
                                <label htmlFor="option3">{data.optionThree}</label>
                            </div>

                            <div>
                                <input onChange={(e) => onRadioButtonChange(e)} value={data.optionFour}
                                    id={style.option4} name={"answer" + count} type="radio" />
                                <label htmlFor="option4">{data.optionFour}</label>
                            </div>
                        </div>
                    );

                })
            }
            <div id={style.submitExam}><button onClick={submitTest}>Submit Exam</button></div>
        </>
    );
}

export default Test
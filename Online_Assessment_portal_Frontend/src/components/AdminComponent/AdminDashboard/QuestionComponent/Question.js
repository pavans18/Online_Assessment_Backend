
//    import style from "./Question.module.css"
import style from "../SubjectComponent/Subject.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions } from "../../../../store/slices/QuestionSlice";
import axios from "axios";
import baseUrl from "../../../baseUrl";

function Question() {

    const dispatch = useDispatch();


    //---------------to get all questions available -----------

    const { post } = useSelector((state) => ({ ...state.questions }));

    useEffect(() => {
        dispatch(getAllQuestions())
    }, [dispatch])



    return (
        <>
            <div id={style.displayHeadingBox}>
                <h2>Question List</h2>
            </div>

            <div id={style.tableBox}>
                <table>
                    <thead>
                        <tr>
                            <th id={style.center}>Question Name</th>
                            <th id={style.center}>Option one</th>
                            <th id={style.center}>Option two</th>
                            <th id={style.center}>Option three</th>
                            <th id={style.center}>Option Four</th>
                            <th id={style.center}>Question Answer</th>
                            <th id={style.center}>Subject Name</th>
                        </tr>
                    </thead>
                    <tbody id={style.tbody}>
                        {
                            post.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{data.questionName}</td>
                                        <td>{data.optionOne}</td>
                                        <td>{data.optionTwo}</td>
                                        <td>{data.optionThree}</td>
                                        <td>{data.optionFour}</td>
                                        <td>{data.answer}</td>
                                        <td>{data.subName.name}</td>
                                    </tr>
                                );
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Question;
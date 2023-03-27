
import React, { useState, useEffect } from "react";
import style from "../StudentDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsResultByUserName } from "../../../../store/slices/ResultSlice";
import { useParams } from "react-router-dom";

function Result() {

    const [results, setResults] = useState([]);

    const dispatch = useDispatch();

    //const { username } = useParams();

    const username = useSelector((state) => state.auth.userInfo.username)


    const { post } = useSelector((state) => ({ ...state.results }));

    useEffect(() => {
        dispatch(getStudentsResultByUserName(username))
    }, []);


    return (
        <>
            <div id={style.displayHeadingBox}>
                <h2>Student Exam List</h2>
            </div>
            <div id={style.tableBox}>
                <table >
                    <thead>
                        <tr>
                            <th id={style.center}>User Email</th>
                            <th id={style.center}>Exam Name</th>
                            <th id={style.center}>Exam Date</th>
                            <th id={style.center}>Result Status</th>
                            <th id={style.center}>Your Score</th>
                            <th id={style.center}>Total Marks</th>
                            <th id={style.center}>Total Question</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            results.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{data.user.username}</td>
                                        <td>{data.subName.name}</td>
                                        <td>{data.edate}</td>
                                        <td>{data.status}</td>
                                        <td>{data.score}</td>
                                        <td>{data.totalMarks}</td>
                                        <td>{data.totalQuestion}</td>
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

export default Result;
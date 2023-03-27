
import { useEffect } from "react";
import style from "../SubjectComponent/Subject.module.css"
import { getAllStudentsResult, getStudentsResultByUserName } from "../../../../store/slices/ResultSlice";
import { useDispatch, useSelector } from "react-redux";

function Result() {


    const dispatch = useDispatch();

    //----------------to get All Students Results-----------------------


    const { post, isLoading } = useSelector((state) => ({ ...state.results }));

    useEffect(() => {
        dispatch(getAllStudentsResult())
    }, [])

    if (isLoading) {
        return <div>Loading results...</div>
    }

    console.log(post.subName);

    return (
        <>
            <div id={style.displayHeadingBox}>
                <h2>Exam List</h2>
            </div>

            <div id={style.tableBox}>
                <table>
                    <thead>
                        <tr>
                            <th id="center">User email</th>
                            <th id="center">Exam Name</th>
                            <th id="center">Exam Date</th>
                            <th id="center">Result Status</th>
                            <th id="center">Your Score</th>
                            <th id="center">Total Marks</th>
                            <th id="center">Total Question</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            post.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{data.username.username}</td>
                                        <td>{data.subName}</td>
                                        <td>{data.examDate}</td>
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
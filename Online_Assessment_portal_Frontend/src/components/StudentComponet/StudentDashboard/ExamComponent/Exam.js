
import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import style from "../StudentDashboard.module.css";


import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../../store/slices/ExamSlice";

function Exam() {

    let { category } = useParams();
    const dispatch = useDispatch();

    //--------------to get all exams that has created ------------------------//

    const { post, isLoading } = useSelector((state) => ({ ...state.exams }));


    useEffect(() => {
        dispatch(getAllExams())
    }, [dispatch])

    if (isLoading) {
        return <div>Loading Exams ....</div>
    }

    return (
        <>
            <div id={style.displayBoxHeadingBox}>
                <h1>All {category} Exam</h1>
            </div>
            {
                post.map((data, i) => {
                    if (data.name.name === category)
                        return (
                            <div id={style.displayBoxExamBox} key={i}>
                                <div id={style.div1}> <span>{data.name.name}</span> </div>
                                <div id={style.div2}> <span>Exam ID: {data.id}</span> </div>
                                <div id={style.div2}> <span>Exam Description: {data.desc}</span> </div>
                                <div id={style.div3}><span>Pass Marks:{data.passMarks}</span> </div>
                                <div id={style.div4}><span>Total Marks:{data.marks}</span></div>
                                <div id={style.div5}>
                                    <NavLink exact to={`/StudentDashboard/Exam/${data.name.name}/${data.id}`}>
                                        <button>Go to Exam</button>
                                    </NavLink>
                                </div>
                            </div>
                        );

                    return <React.Fragment key={i}></React.Fragment>

                })
            }
        </>
    );
}
export default Exam;
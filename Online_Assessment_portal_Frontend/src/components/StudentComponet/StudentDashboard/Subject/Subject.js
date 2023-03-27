import style from "../StudentDashboard.module.css";
import { useEffect } from "react";

import { NavLink } from "react-router-dom";

import { getAllSubjects } from "../../../../store/slices/SubjectSlice";
import { useDispatch, useSelector } from "react-redux";

function Subject() {

    // fetching all subjects from database using redux

    const { post, isLoading } = useSelector((state) => ({ ...state.subjects }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSubjects());
    }, [dispatch])

    if (isLoading) {
        return <div>Loading Subjects ....</div>
    }


    return (
        <>
            <div id={style.displayBoxHeadingBox}>
                <h1>Choose Subjects</h1>
            </div>

            {
                post.map((data, i) => {
                    return (
                        <div id={style.displayBoxSubjectBox} key={i}>

                            <div id={style.subjectText}>
                                <span>{data.name}</span>
                            </div>

                            <div id={style.subjectButton}>
                                <NavLink exact to={`/StudentDashboard/Exam/${data.name}`}>
                                    <button>Go to Exam</button>
                                </NavLink>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}

export default Subject;
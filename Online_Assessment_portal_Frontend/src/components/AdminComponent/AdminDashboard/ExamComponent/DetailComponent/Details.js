import style from "../../SubjectComponent/Subject.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import baseUrl from "../../../../baseUrl";
import { getDetailsOfParticularExam } from "../../../../../store/slices/QuestionSlice";
import { useDispatch, useSelector } from "react-redux";

function Details() {


   const { id } = useParams();

   console.log(id);

   const dispatch = useDispatch();


   //------------------to get details of particular exam------------------------

   const { post, isLoading } = useSelector((state) => {
      return state.questions
   });

   console.log(post);

   useEffect(() => {
      dispatch(getDetailsOfParticularExam(id))
   }, [dispatch, id])

   // -------------------------Go back button function---------------------------------------

   let history = useHistory();

   function handleGoBack() {
      history.push('/AdminDashboard/Exam');
   }


   const subject = JSON.stringify(post.name)

   console.log(subject);

   const [exam, setExam] = useState({
      name: "",
      desc: "",
      level: "",
      passMarks: "",
      totalQuestion: "",
      marks: "",
      date: ""
   });

   if (isLoading) {
      return <div>Loading Exams ....</div>
   }

   return (
      <>
         <div id={style.displayHeadingBox}>
            <h2>Exam Details</h2>
         </div>

         <div id={style.tableBox}>
            <table >
               <thead >



                  <tr>
                     <th id={style.center}>Exam Name</th>
                     <td id={style.center}> {subject} </td>
                  </tr>

                  <tr>
                     <th id={style.center}>Exam Description</th>
                     <td id={style.center}> {post.desc} </td>
                  </tr>

                  <tr>
                     <th id={style.center}>Exam Creation Date</th>
                     <td id={style.center}> {post.date} </td>
                  </tr>

                  <tr>
                     <th id={style.center}>Exam TotalMarks</th>
                     <td id={style.center}> {post.marks} </td>
                  </tr>

                  <tr>
                     <th id={style.center}>Exam TotalQuestion</th>
                     <td id={style.center}> {post.totalQuestion} </td>
                  </tr>

                  <tr>
                     <th id={style.center}>Exam PassMarks</th>
                     <td id={style.center}> {post.passMarks} </td>
                  </tr>

                  <tr>
                     <th id={style.center}>Exam Level</th>
                     <td id={style.center}> {post.level} </td>
                  </tr>
               </thead>
            </table>

         </div>

         <div id={style.addSubjectBox}>
            <button onClick={handleGoBack}>Go Back</button>
         </div>
      </>
   );
}

export default Details;
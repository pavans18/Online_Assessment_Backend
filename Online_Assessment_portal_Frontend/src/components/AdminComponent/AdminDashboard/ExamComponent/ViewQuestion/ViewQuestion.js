
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import style from "../../SubjectComponent/Subject.module.css";
import baseUrl from "../../../../baseUrl";

function ViewQuestion() {

    //  ---------------------- add Subject & close buttton working  -------------------------------------

    const [display, setDisplay] = useState({
        display: "none"
    });

    function handleEditQuestion(questionId) {
        setDisplay({ display: "block" });
        setDataInInputField(questionId);
    }

    function handleClose() {
        setDisplay({ display: "none" });
    }

    const { id } = useParams();

    //  ---------------------- Fetching All Questions -------------------------------------

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function getAllQuestions() {
            let value = await axios.get(`${baseUrl}/apiquestion/getQuestionsByExam/${id}`);
            setQuestions(value.data);

        }
        getAllQuestions();
    }, [id])


    //  ---------------------- handling text field -------------------------------------

    const [updatedQ, setUpdatedQ] = useState({
        questionName: "",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: "",
        answer: "",
        examName: id,
        subName: ""
    });


    function onTextFieldChange(e) {
        setUpdatedQ({
            ...updatedQ,
            [e.target.name]: e.target.value
        })

    }


    //  ---------------------- Showing data in text field -------------------------------------

    // Id of current question clicked
    const [qId, setQId] = useState();


    function setDataInInputField(questionId) {
        setQId(questionId);

        for (let i = 0; i < questions.length; i++) {
            if (parseInt(questions[i].id) === parseInt(questionId)) {
                setUpdatedQ(questions[i]);
            }
        }
    }
    // -----------------------------------------------------------------------------------------

    const [check, setCheck] = useState();


    async function updateQuestion() {
        await axios.put(`${baseUrl}/apiquestion/question/${qId}`, updatedQ);
        setCheck(true);
    }

    // ----------------------------------------------------------------------------------------

    let history = useHistory();

    function handleGoBack() {
        history.push("/AdminDashboard/Exam");
    }
    // ----------------------------------------------------------------------------------------

    const [d, setD] = useState();



    async function deleteQuestion(id) {
        await axios.delete(`${baseUrl}/apiquestion/deleteQuestionInExam/${id}`);
        setD(true);
    }


    if (check) return <ViewQuestion />;

    if (d) return <ViewQuestion />;



    return (
        <>
            <div id={style.displayHeadingBox}>
                <h2>Question List</h2>
            </div>

            <div id={style.tableBox}>
                <table>
                    <thead >
                        <tr>
                            <th id={style.center}>Question Name</th>
                            <th id={style.center}>Option one</th>
                            <th id={style.center}>Option two</th>
                            <th id={style.center}>Option three</th>
                            <th id={style.center}>Option four</th>
                            <th id={style.center}>Question Answer</th>
                            <th id={style.center}>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            questions.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{data.questionName}</td>
                                        <td>{data.optionOne}</td>
                                        <td>{data.optionTwo}</td>
                                        <td>{data.optionThree}</td>
                                        <td>{data.optionFour}</td>
                                        <td>{data.answer}</td>
                                        <td>
                                            <button onClick={() => handleEditQuestion(data.id)}>Edit</button>

                                            <button onClick={() => deleteQuestion(data.id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }

                    </tbody>
                </table>
            </div>

            <div id={style.addSubjectBox}>
                <button onClick={handleGoBack}>Go Back</button>
            </div>


            <div id={style.addBox} style={display}>

                <label>Enter Question </label>
                <input value={updatedQ.questionName}
                    onChange={(e) => onTextFieldChange(e)}
                    name="questionName"
                    type="text" placeholder="Enter Question " />

                <label >Enter Option A </label>
                <input value={updatedQ.optionOne}
                    onChange={(e) => onTextFieldChange(e)}
                    name="optionOne"
                    type="text" placeholder="Enter Option A" />

                <label >Enter Option B </label>
                <input value={updatedQ.optionTwo}
                    onChange={(e) => onTextFieldChange(e)}
                    name="optionTwo"
                    type="text" placeholder="Enter Option B" />

                <label >Enter Option C </label>
                <input value={updatedQ.optionThree}
                    onChange={(e) => onTextFieldChange(e)}
                    name="optionThree"
                    type="text" placeholder="Enter Option C" />

                <label >Enter Option D </label>
                <input value={updatedQ.optionFour}
                    onChange={(e) => onTextFieldChange(e)}
                    name="optionFour"
                    type="text" placeholder="Enter Option D" />

                <label >Enter Question Answer </label>
                <input value={updatedQ.answer}
                    onChange={(e) => onTextFieldChange(e)}
                    name="answer"
                    type="text" placeholder="Enter Answer" />

                <label >Enter Subject </label>
                <input value={updatedQ.subName.name}
                    onChange={(e) => onTextFieldChange(e)}
                    name="subName"
                    type="text" placeholder="Enter Subject" />

                <div id={style.buttonBox}>
                    <button onClick={updateQuestion} >Update Question</button>
                    <button onClick={handleClose} >Close</button>
                </div>
            </div>
        </>
    );
}

export default ViewQuestion;











// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import axios from "axios";
// import style from "../../SubjectComponent/Subject.module.css";
// import baseUrl from "../../../../baseUrl";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteQuestionForExamById } from "../../../../../store/slices/QuestionSlice";

// function ViewQuestion() {

//     //  ---------------------- add Subject & close buttton working  -------------------------------------

//     const [display, setDisplay] = useState({
//         display: "none"
//     });

//     function handleEditQuestion(questionId) {
//         setDisplay({ display: "block" });
//         setDataInInputField(questionId);
//     }

//     function handleClose() {
//         setDisplay({ display: "none" });
//     }

//     const { id } = useParams();

//     //  ---------------------- Fetching All Questions -------------------------------------

//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         async function getAllQuestions() {
//             let value = await axios.get(`${baseUrl}/apiquestion/getQuestionsByExam/${id}`);
//             setQuestions(value.data);

//         }
//         getAllQuestions();
//     }, [id])


//     //  ---------------------- handling text field -------------------------------------

//     const [updatedQ, setUpdatedQ] = useState({
//         qname: "",
//         optionOne: "",
//         optionTwo: "",
//         optionThree: "",
//         optionFour: "",
//         answer: "",
//         ename: id,
//         sname: ""
//     });


//     function onTextFieldChange(e) {
//         setUpdatedQ({
//             ...updatedQ,
//             [e.target.name]: e.target.value
//         })

//     }


//     //  ---------------------- Showing data in text field -------------------------------------

//     // Id of current question clicked
//     const [qId, setQId] = useState();


//     function setDataInInputField(questionId) {
//         setQId(questionId);

//         for (let i = 0; i < questions.length; i++) {
//             if (parseInt(questions[i].id) === parseInt(questionId)) {
//                 setUpdatedQ(questions[i]);
//             }
//         }
//     }
//     // -----------------------------------------------------------------------------------------

//     const [check, setCheck] = useState();


//     async function updateQuestion() {
//         await axios.put(`${baseUrl}/apiquestion/question/${qId}`, updatedQ);
//         setCheck(true);
//     }

//     // ----------------------------------------------------------------------------------------

//     let history = useHistory();

//     function handleGoBack() {
//         history.push("/AdminDashboard/Exam");
//     }
//     // ----------------------------------------------------------------------------------------

//     const [d, setD] = useState();

//     // const [d, setD] = useState();

//     const dispatch = useDispatch();

//     const { post, loading } = useSelector((state) => ({ ...state.questions }));

//     const handleDeleteQUestion = ((e) => {
//         dispatch(deleteQuestionForExamById(e));
//         setD(true);
//         setQuestions(post);
//     });

//     // async function deleteQuestion(id) {
//     //     await axios.delete(`${baseUrl}/apiquestion/deleteQuestionInExam/${id}`);
//     //     setD(true);
//     // }


//     if (check) return <ViewQuestion />;

//     if (d) return <ViewQuestion />;



//     return (
//         <>
//             <div id={style.displayHeadingBox}>
//                 <h2>Question List</h2>
//             </div>

//             <div id={style.tableBox}>
//                 <table>
//                     <thead >
//                         <tr>
//                             <th id={style.center}>Question Name</th>
//                             <th id={style.center}>Option one</th>
//                             <th id={style.center}>Option two</th>
//                             <th id={style.center}>Option three</th>
//                             <th id={style.center}>Option four</th>
//                             <th id={style.center}>Question Answer</th>
//                             <th id={style.center}>Options</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             questions.map((data, i) => {
//                                 return (
//                                     <tr key={i}>
//                                         <td>{data.qname}</td>
//                                         <td>{data.optionOne}</td>
//                                         <td>{data.optionTwo}</td>
//                                         <td>{data.optionThree}</td>
//                                         <td>{data.optionFour}</td>
//                                         <td>{data.answer}</td>
//                                         <td>
//                                             <button onClick={() => handleEditQuestion(data.id)}>Edit</button>

//                                             <button onClick={() => handleDeleteQUestion({ id: data.id })}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 );
//                             })
//                         }

//                     </tbody>
//                 </table>
//             </div>

//             <div id={style.addSubjectBox}>
//                 <button onClick={handleGoBack}>Go Back</button>
//             </div>


//             <div id={style.addBox} style={display}>

//                 <label>Enter Question </label>
//                 <input value={updatedQ.qname}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="qname"
//                     type="text" placeholder="Enter Question " />

//                 <label >Enter Option A </label>
//                 <input value={updatedQ.optionOne}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionOne"
//                     type="text" placeholder="Enter Option A" />

//                 <label >Enter Option B </label>
//                 <input value={updatedQ.optionTwo}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionTwo"
//                     type="text" placeholder="Enter Option B" />

//                 <label >Enter Option C </label>
//                 <input value={updatedQ.optionThree}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionThree"
//                     type="text" placeholder="Enter Option C" />

//                 <label >Enter Option D </label>
//                 <input value={updatedQ.optionFour}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionFour"
//                     type="text" placeholder="Enter Option D" />

//                 <label >Enter Question Answer </label>
//                 <input value={updatedQ.answer}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="answer"
//                     type="text" placeholder="Enter Answer" />

//                 <label >Enter Subject </label>
//                 <input value={updatedQ.sname.name}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="sname"
//                     type="text" placeholder="Enter Subject" />

//                 <div id={style.buttonBox}>
//                     <button onClick={updateQuestion} >Update Question</button>
//                     <button onClick={handleClose} >Close</button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ViewQuestion;













// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import axios from "axios";
// import style from "../../SubjectComponent/Subject.module.css";
// import baseUrl from "../../../../baseUrl";
// import { deleteQuestionForExamById } from "../../../../../store/slices/QuestionSlice";
// import { useDispatch, useSelector } from "react-redux";

// function ViewQuestion() {

//     //  ---------------------- add Subject & close buttton working  -------------------------------------

//     const [display, setDisplay] = useState({
//         display: "none"
//     });

//     function handleEditQuestion(questionId) {
//         setDisplay({ display: "block" });
//         setDataInInputField(questionId);
//     }

//     function handleClose() {
//         setDisplay({ display: "none" });
//     }

//     const { id } = useParams();

//     //  ---------------------- Fetching All Questions -------------------------------------

//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         async function getAllQuestions() {
//             let value = await axios.get(`${baseUrl}/apiquestion/getQuestionsByExam/${id}`);
//             setQuestions(value.data);

//         }
//         getAllQuestions();
//     }, [id])


//     //  ---------------------- handling text field -------------------------------------

//     const [updatedQ, setUpdatedQ] = useState({
//         qname: "",
//         optionOne: "",
//         optionTwo: "",
//         optionThree: "",
//         optionFour: "",
//         answer: "",
//         ename: id,
//         sname: ""
//     });


//     function onTextFieldChange(e) {
//         setUpdatedQ({
//             ...updatedQ,
//             [e.target.name]: e.target.value
//         })

//     }


//     //  ---------------------- Showing data in text field -------------------------------------

//     // Id of current question clicked
//     const [qId, setQId] = useState();


//     function setDataInInputField(questionId) {
//         setQId(questionId);

//         for (let i = 0; i < questions.length; i++) {
//             if (parseInt(questions[i].id) === parseInt(questionId)) {
//                 setUpdatedQ(questions[i]);
//             }
//         }
//     }
//     // -----------------------------------------------------------------------------------------

//     const [check, setCheck] = useState();


//     async function updateQuestion() {
//         await axios.put(`${baseUrl}/apiquestion/question/${qId}`, updatedQ);
//         setCheck(true);
//     }

//     // ----------------------------------------------------------------------------------------

//     let history = useHistory();

//     function handleGoBack() {
//         history.push("/AdminDashboard/Exam");
//     }
//     // ----------------------------------------------------------------------------------------

//     const [d, setD] = useState();

//     const dispatch = useDispatch();

//     const { post, loading } = useSelector((state) => ({ ...state.questions }));

//     const handleDeleteQUestion = ((e) => {
//         dispatch(deleteQuestionForExamById(e));
//         setD(true);
//         //setQuestions(post.data);
//     });

//     if (check) return <ViewQuestion />;

//     if (d) return <ViewQuestion />;

//     // async function deleteQuestion(id) {
//     //     await axios.delete(`${baseUrl}/apiquestion/deleteQuestionInExam/${id}`);
//     //     setD(true);
//     // }

//     return (
//         <>
//             <div id={style.displayHeadingBox}>
//                 <h2>Question List</h2>
//             </div>

//             <div id={style.tableBox}>
//                 <table>
//                     <thead >
//                         <tr>
//                             <th id={style.center}>Question Name</th>
//                             <th id={style.center}>Option one</th>
//                             <th id={style.center}>Option two</th>
//                             <th id={style.center}>Option three</th>
//                             <th id={style.center}>Option four</th>
//                             <th id={style.center}>Question Answer</th>
//                             <th id={style.center}>Options</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             questions.map((data, i) => {
//                                 return (
//                                     <tr key={i}>
//                                         <td>{data.qname}</td>
//                                         <td>{data.optionOne}</td>
//                                         <td>{data.optionTwo}</td>
//                                         <td>{data.optionThree}</td>
//                                         <td>{data.optionFour}</td>
//                                         <td>{data.answer}</td>
//                                         <td>
//                                             <button onClick={() => handleEditQuestion(data.id)}>Edit</button>

//                                             <button onClick={() => handleDeleteQUestion({ id: data.id })}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 );
//                             })
//                         }

//                     </tbody>
//                 </table>
//             </div>

//             <div id={style.addSubjectBox}>
//                 <button onClick={handleGoBack}>Go Back</button>
//             </div>


//             <div id={style.addBox} style={display}>

//                 <label>Enter Question </label>
//                 <input value={updatedQ.qname}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="qname"
//                     type="text" placeholder="Enter Question " />

//                 <label >Enter Option A </label>
//                 <input value={updatedQ.optionOne}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionOne"
//                     type="text" placeholder="Enter Option A" />

//                 <label >Enter Option B </label>
//                 <input value={updatedQ.optionTwo}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionTwo"
//                     type="text" placeholder="Enter Option B" />

//                 <label >Enter Option C </label>
//                 <input value={updatedQ.optionThree}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionThree"
//                     type="text" placeholder="Enter Option C" />

//                 <label >Enter Option D </label>
//                 <input value={updatedQ.optionFour}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionFour"
//                     type="text" placeholder="Enter Option D" />

//                 <label >Enter Question Answer </label>
//                 <input value={updatedQ.answer}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="answer"
//                     type="text" placeholder="Enter Answer" />

//                 <label >Enter Subject </label>
//                 <input value={updatedQ.sname.name}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="sname"
//                     type="text" placeholder="Enter Subject" />

//                 <div id={style.buttonBox}>
//                     <button onClick={updateQuestion} >Update Question</button>
//                     <button onClick={handleClose} >Close</button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ViewQuestion;







// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import axios from "axios";
// import style from "../../SubjectComponent/Subject.module.css";
// import baseUrl from "../../../../baseUrl";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllQuestionsByExamId, deleteQuestionForExamById } from "../../../../../store/slices/QuestionSlice";

// function ViewQuestion() {

//     const dispatch = useDispatch();

//     //  ---------------------- add Subject & close buttton working  -------------------------------------

//     const [display, setDisplay] = useState({
//         display: "none"
//     });

//     function handleEditQuestion(questionId) {
//         setDisplay({ display: "block" });
//         setDataInInputField(questionId);
//     }

//     function handleClose() {
//         setDisplay({ display: "none" });
//     }

//     const { id } = useParams();

//     //  ---------------------- Fetching All Questions -------------------------------------

//     const [questions, setQuestions] = useState([]);

//     const { post, loading } = useSelector((state) => ({ ...state.questions }));

//     useEffect(() => {
//         dispatch(getAllQuestionsByExamId({ id }));
//         setQuestions(post);
//     }, [id])

//     // useEffect(() => {
//     //     async function getAllQuestions() {
//     //         let value = await axios.get(`${baseUrl}/apiquestion/getQuestionsByExam/${id}`);
//     //         setQuestions(value.data);

//     //     }
//     //     getAllQuestions();
//     // }, [id])


//     //  ---------------------- handling text field -------------------------------------

//     const [updatedQ, setUpdatedQ] = useState({
//         qname: "",
//         optionOne: "",
//         optionTwo: "",
//         optionThree: "",
//         optionFour: "",
//         answer: "",
//         ename: id,
//         sname: ""
//     });


//     function onTextFieldChange(e) {
//         setUpdatedQ({
//             ...updatedQ,
//             [e.target.name]: e.target.value
//         })

//     }


//     //  ---------------------- Showing data in text field -------------------------------------

//     // Id of current question clicked
//     const [qId, setQId] = useState();


//     function setDataInInputField(questionId) {
//         setQId(questionId);

//         for (let i = 0; i < questions.length; i++) {
//             if (parseInt(questions[i].id) === parseInt(questionId)) {
//                 setUpdatedQ(questions[i]);
//             }
//         }
//     }
//     // -----------------------------------------------------------------------------------------

//     const [check, setCheck] = useState();


//     async function updateQuestion() {
//         await axios.put(`${baseUrl}/apiquestion/question/${qId}`, updatedQ);
//         setCheck(true);
//     }

//     // ----------------------------------------------------------------------------------------

//     let history = useHistory();

//     function handleGoBack() {
//         history.push("/AdminDashboard/Exam");
//     }
//     // ----------------------------------------------------------------------------------------

//     const [d, setD] = useState();



//     async function deleteQuestion(id) {
//         await axios.delete(`${baseUrl}/apiquestion/deleteQuestionInExam/${id}`);
//         setD(true);
//     }

//     //---------------delete question----------------------------

//     // function deleteQuestionForExam(question) {
//     //     dispatch(deleteQuestionForExamById(question.id));
//     //     setCheck(true);
//     // }

//     // const handleDeleteQUestion = ((e) => {
//     //     dispatch(deleteQuestionForExamById(e))
//     //     setD(true);
//     //     //setQuestions(post.data);
//     // });
//     //--------------------------------------------------------

//     if (check) return <ViewQuestion />;

//     if (d) return <ViewQuestion />;



//     return (
//         <>
//             <div id={style.displayHeadingBox}>
//                 <h2>Question List</h2>
//             </div>

//             <div id={style.tableBox}>
//                 <table>
//                     <thead >
//                         <tr>
//                             <th id={style.center}>Question Name</th>
//                             <th id={style.center}>Option one</th>
//                             <th id={style.center}>Option two</th>
//                             <th id={style.center}>Option three</th>
//                             <th id={style.center}>Option four</th>
//                             <th id={style.center}>Question Answer</th>
//                             <th id={style.center}>Options</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             questions.map((data, i) => {
//                                 return (
//                                     <tr key={i}>
//                                         <td>{data.qname}</td>
//                                         <td>{data.optionOne}</td>
//                                         <td>{data.optionTwo}</td>
//                                         <td>{data.optionThree}</td>
//                                         <td>{data.optionFour}</td>
//                                         <td>{data.answer}</td>
//                                         <td>
//                                             <button onClick={() => handleEditQuestion(data.id)}>Edit</button>
//                                             {/* <button onClick={() => deleteQuestionForExam(data)}>Delete</button> */}
//                                             <button onClick={() => deleteQuestion(data.id)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 );
//                             })
//                         }

//                     </tbody>
//                 </table>
//             </div>

//             <div id={style.addSubjectBox}>
//                 <button onClick={handleGoBack}>Go Back</button>
//             </div>


//             <div id={style.addBox} style={display}>

//                 <label>Enter Question </label>
//                 <input value={updatedQ.qname}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="qname"
//                     type="text" placeholder="Enter Question " />

//                 <label >Enter Option A </label>
//                 <input value={updatedQ.optionOne}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionOne"
//                     type="text" placeholder="Enter Option A" />

//                 <label >Enter Option B </label>
//                 <input value={updatedQ.optionTwo}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionTwo"
//                     type="text" placeholder="Enter Option B" />

//                 <label >Enter Option C </label>
//                 <input value={updatedQ.optionThree}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionThree"
//                     type="text" placeholder="Enter Option C" />

//                 <label >Enter Option D </label>
//                 <input value={updatedQ.optionFour}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionFour"
//                     type="text" placeholder="Enter Option D" />

//                 <label >Enter Question Answer </label>
//                 <input value={updatedQ.answer}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="answer"
//                     type="text" placeholder="Enter Answer" />

//                 <label >Enter Subject </label>
//                 <input value={updatedQ.sname.name}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="sname"
//                     type="text" placeholder="Enter Subject" />

//                 <div id={style.buttonBox}>
//                     <button onClick={updateQuestion} >Update Question</button>
//                     <button onClick={handleClose} >Close</button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ViewQuestion;









// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import axios from "axios";
// import style from "../../SubjectComponent/Subject.module.css";
// import baseUrl from "../../../../baseUrl";
// import { deleteQuestionForExamById, getAllQuestionsByExamId } from "../../../../../store/slices/QuestionSlice";
// import { useDispatch, useSelector } from "react-redux";


// function ViewQuestion() {

//     //const [questions, setQuestions] = useState([]);

//     const dispatch = useDispatch();

//     const [d, setD] = useState();

//     //  ---------------------- add Subject & close buttton working  -------------------------------------

//     const [display, setDisplay] = useState({
//         display: "none"
//     });

//     function handleEditQuestion(questionId) {
//         setDisplay({ display: "block" });
//         setDataInInputField(questionId);
//     }

//     function handleClose() {
//         setDisplay({ display: "none" });
//     }

//     const { id } = useParams();

//     //  ---------------------- Fetching All Questions based on exam Id -------------------------------------

//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         async function getAllQuestions() {
//             let value = await axios.get(`${baseUrl}/apiquestion/getQuestionsByExam/${id}`);
//             setQuestions(value.data);
//         }
//         getAllQuestions();
//     }, [id])


//     //  ---------------------- handling text field -------------------------------------

//     const [updatedQ, setUpdatedQ] = useState({
//         qname: "",
//         optionOne: "",
//         optionTwo: "",
//         optionThree: "",
//         optionFour: "",
//         answer: "",
//         ename: id,
//         sname: ""
//     });


//     function onTextFieldChange(e) {
//         setUpdatedQ({
//             ...updatedQ,
//             [e.target.name]: e.target.value
//         })

//     }



//     //  ---------------------- Showing data in text field -------------------------------------

//     // Id of current question clicked
//     const [qId, setQId] = useState(0);


//     function setDataInInputField(questionId) {
//         setQId(questionId);

//         for (let i = 0; i < questions.length; i++) {
//             if (parseInt(questions[i].id) === parseInt(questionId)) {
//                 setUpdatedQ(questions[i]);
//             }
//         }
//     }

//     // -----------------------------------------------------------------------------------------

//     const [check, setCheck] = useState();

//     // function updateQuestion() {
//     //     dispatch(updateQuestionByExam({ qId, updatedQ }));
//     //     setCheck(true);
//     // }


//     async function updateQuestion() {
//         await axios.put(`${baseUrl}/apiquestion/question/${qId}`, updatedQ);
//         //history.push("/AdminDashboard/Exam/ViewQuestion/${qId}");
//         setCheck(true);
//     }

//     //-------------------------------------------------------------------------------------
//     let history = useHistory();

//     function handleGoBack() {
//         history.push("/AdminDashboard/Exam");
//     }

//     // ----------------------------------------------------------------------------------------


//     //--------------------to delete  question using redux----------------------------------------

//     const handleDeleteQUestion = ((e) => {
//         dispatch(deleteQuestionForExamById(e))
//         setD(true);
//         //setQuestions(post.data);
//     });




//     //  ---------------------- Fetching All Questions By Exam Id -------------------------------------

//     const { post, loading } = useSelector((state) => ({ ...state.questions }));

//     // useEffect(() => {
//     //     dispatch(getAllQuestionsByExamId({ id }));
//     //     setQuestions(post.data);
//     // }, [id])



//     if (d) return <ViewQuestion />;

//     if (check) return <ViewQuestion />;



//     return (
//         <>
//             <div id={style.displayHeadingBox}>
//                 <h2>Question List</h2>
//             </div>

//             <div id={style.tableBox}>
//                 <table>
//                     <thead >
//                         <tr>
//                             <th id={style.center}>Question Name</th>
//                             <th id={style.center}>Option one</th>
//                             <th id={style.center}>Option two</th>
//                             <th id={style.center}>Option three</th>
//                             <th id={style.center}>Option four</th>
//                             <th id={style.center}>Question Answer</th>
//                             <th id={style.center}>Options</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             post.map((data, i) => {
//                                 return (
//                                     <tr key={i}>
//                                         <td>{data.qname}</td>
//                                         <td>{data.optionOne}</td>
//                                         <td>{data.optionTwo}</td>
//                                         <td>{data.optionThree}</td>
//                                         <td>{data.optionFour}</td>
//                                         <td>{data.answer}</td>
//                                         <td>
//                                             <button onClick={() => handleEditQuestion(data.id)}>Edit</button>
//                                             <button onClick={() => handleDeleteQUestion(({ id: data.id }))}>Delete</button>
//                                             {/* <button onClick={() => deleteQuestion(data.id)}>Delete</button> */}
//                                         </td>
//                                     </tr>
//                                 );
//                             })
//                         }

//                     </tbody>
//                 </table>
//             </div>

//             <div id={style.addSubjectBox}>
//                 <button onClick={handleGoBack}>Go Back</button>
//             </div>


//             <div id={style.addBox} style={display}>

//                 <label>Enter Question </label>
//                 <input value={updatedQ.qname}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="qname"
//                     type="text" placeholder="Enter Question " />

//                 <label >Enter Option A </label>
//                 <input value={updatedQ.optionOne}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionOne"
//                     type="text" placeholder="Enter Option A" />

//                 <label >Enter Option B </label>
//                 <input value={updatedQ.optionTwo}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionTwo"
//                     type="text" placeholder="Enter Option B" />

//                 <label >Enter Option C </label>
//                 <input value={updatedQ.optionThree}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionThree"
//                     type="text" placeholder="Enter Option C" />

//                 <label >Enter Option D </label>
//                 <input value={updatedQ.optionFour}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="optionFour"
//                     type="text" placeholder="Enter Option D" />

//                 <label >Enter Question Answer </label>
//                 <input value={updatedQ.answer}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="answer"
//                     type="text" placeholder="Enter Answer" />

//                 <label >Enter Subject </label>
//                 <input value={updatedQ.sname.name}
//                     onChange={(e) => onTextFieldChange(e)}
//                     name="sname"
//                     type="text" placeholder="Enter Subject" />

//                 <div id={style.buttonBox}>
//                     <button onClick={updateQuestion} >Update Question</button>
//                     <button onClick={handleClose} >Close</button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ViewQuestion;
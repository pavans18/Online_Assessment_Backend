import style from "../../SubjectComponent/Subject.module.css";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../../baseUrl";
import ViewQuestion from "../ViewQuestion/ViewQuestion";


function AddQuestion() {

  const { id } = useParams();

  const [addQuestion, setAddQuestion] = useState();

  const [question, setQuestion] = useState({
    questionName: "",
    optionOne: "",
    optionTwo: "",
    optionThree: "",
    optionFour: "",
    answer: "",
    examName: id,
    subName: ""
  });

  function onInputChange(e) {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value
    });

  }


  let history = useHistory();

  function handleGoBack() {
    history.push(`/AdminDashboard/Exam`);
  }


  async function addnewQuestion() {
    setQuestion(question.examName = { id: id });

    setQuestion(question.subName = { name: document.getElementById("subjectField").value });


    await axios.post(`${baseUrl}/apiquestion/addQuestion`, question);
    history.push(`/AdminDashboard/Exam/ViewQuestion/${id}`);
    setAddQuestion(true)
    history.push(`/AdminDashboard/Exam/ViewQuestion/${id}`);
  }

  if (addQuestion) return <ViewQuestion />



  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Adding Question</h2>
      </div>

      <div id={style.addBox} className={style.addQuestion}>
        <label >Question Name </label>
        <input onChange={(e) => onInputChange(e)}
          name="questionName"
          type="text" placeholder="Enter Question" />

        <label >Enter Option A </label>
        <input onChange={(e) => onInputChange(e)}
          name="optionOne"
          type="text" placeholder="Enter Option A" />

        <label >Enter Option B</label>
        <input onChange={(e) => onInputChange(e)}
          name="optionTwo"
          type="text" placeholder="Enter Option B" />

        <label >Enter Option C</label>
        <input onChange={(e) => onInputChange(e)}
          name="optionThree"
          type="text" placeholder="Enter Option C" />

        <label >Enter Option D</label>
        <input onChange={(e) => onInputChange(e)}
          name="optionFour"
          type="text" placeholder="Enter Option D" />

        <label >Enter Question Answer</label>
        <input onChange={(e) => onInputChange(e)}
          name="answer"
          type="text" placeholder="Enter Question answer " />


        <label >Enter Subject</label>
        <input onChange={(e) => onInputChange(e)}
          name="subName" id="subjectField"
          type="text" placeholder="Enter Subject" />

        <div id={style.buttonBox}>
          <button onClick={addnewQuestion} >Add</button>
          <button onClick={handleGoBack}>Go back</button>
        </div>

      </div>
    </>
  );
}

export default AddQuestion;
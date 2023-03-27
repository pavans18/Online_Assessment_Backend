import { NavLink, Switch, Route, BrowserRouter, useHistory } from "react-router-dom";
import style from "./StudentDashboard.module.css";
import Subject from "./Subject/Subject";
import Result from "./ResultComponent/Result";
import Exam from "./ExamComponent/Exam";
import Test from "./TestComponent/Test";
import Home from "../../HomeComponent/Home";
import { useSelector } from "react-redux";
import { useEffect } from "react";



function StudentDashboard() {


    // useEffect(() => {
    //     if (sessionStorage.getItem("user") == null) {
    //         alert("Detect Illegal Way of Entering");
    //         history.push("/StudentLogin");
    //     }
    // })



    let history = useHistory();

    function logout() {
        sessionStorage.clear();
        history.push("/");
    }

    function goToHome() {
        history.push("/");
    }



    return (
        <>
            <BrowserRouter>
                <div id={style.header}>

                    <div id={style.headerHeadingBox}>
                        <h3>Online Assessment Platform</h3>


                    </div>

                    <div id={style.headerMenuBox}>
                        <NavLink exact to="/StudentDashboard"> <span>Subject</span> </NavLink>
                        <NavLink exact to="/StudentDashboard/Result" > <span>My Result</span></NavLink>
                        <NavLink onClick={goToHome} exact to="/"> <span>Logout</span> </NavLink>
                    </div>

                </div>

                <div id={style.displayBox}>
                    <Switch>
                        <Route exact path="/StudentDashboard" component={Subject} ></Route>
                        <Route exact path="/StudentDashboard/Result" component={Result} ></Route>

                        <Route exact path="/StudentDashboard/Exam/:category" component={Exam} ></Route>

                        <Route exact path="/StudentDashboard/Exam/:category/:id" component={Test} ></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    );
}

export default StudentDashboard;
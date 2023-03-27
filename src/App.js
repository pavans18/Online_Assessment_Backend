
import Home from "./components/HomeComponent/Home";
import StudentDashboard from "./components/StudentComponet/StudentDashboard/StudentDashboard";
import AdminLogin from "./components/AdminComponent/AdminLogin/AdminLogin";
import AdminDashboard from "./components/AdminComponent/AdminDashboard/AdminDashboard";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import StudentSignup from "./components/StudentComponet/StudentSignup/StudentSignup"
import StudentLogin from "./components/StudentComponet/StudentLogin/StudentLogin"
import Subject from "./components/AdminComponent/AdminDashboard/SubjectComponent/Subject";



function App() {
  return (
    <>


      <BrowserRouter>


        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/AdminLogin" component={AdminLogin}></Route>
          <Route exact path="/StudentSignup" component={StudentSignup}></Route>
          <Route exact path="/AdminDashboard" component={AdminDashboard}></Route>
          <Route exact path="/StudentLogin" component={StudentLogin}></Route>
          <Route exact path="/StudentDashboard" component={StudentDashboard}></Route>
          <Route exact path="/Subject" component={Subject}></Route>


        </Switch>

      </BrowserRouter>
    </>

  );

}

export default App;
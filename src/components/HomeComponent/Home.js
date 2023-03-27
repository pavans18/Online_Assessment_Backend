
import style from "./Home.module.css";
import pic1 from "../../assests/1.png";
import stulogo from "../../assests/imagesstu.png"
import adminlogo from "../../assests/admin.png"

import { NavLink } from "react-router-dom";

function Home() {
  return (

    <>
      <body>
        <div id={style.header}>
          <div id={style.headerHeadingBox}>
            <h3 >Online Assessment Portal</h3>
          </div>
        </div>

        <div id={style.div1}>
          <img src={pic1} alt="" />

        </div>


        <div id={style.div2}>

          <div className={style.div3}>
            <NavLink exact to="/StudentLogin">
              <img src={stulogo} alt="" />
              <span>Student</span>
            </NavLink>
          </div>

          <div className={style.div3}>
            <NavLink exact to="/AdminLogin">
              <img src={adminlogo} alt="" />
              <span>Admin</span>
            </NavLink>
          </div>

        </div>


      </body>

    </>

  );
}



export default Home;
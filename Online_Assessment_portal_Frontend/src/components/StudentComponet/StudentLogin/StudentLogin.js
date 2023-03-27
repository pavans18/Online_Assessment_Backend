import style from "./StudentLogin.module.css";
import { NavLink, useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { userLogin } from "../../Authentication/AuthAction";


function StudentLogin() {

    let history = useHistory();

    const success = useSelector((state) => state.auth.success)

    ///-----auth slice implementation---------

    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    useEffect(() => {
        if (success)
            history.push("/StudentDashBoard");
    }, [success])

    const submitForm = (data) => {

        dispatch(userLogin(data))

    }




    return (

        <div id={style.container}>

            <div id={style.containerHeadingBox}>
                <h1>Student Login</h1>
            </div>

            <form onSubmit={handleSubmit(submitForm)}>

                <div id={style.emailBox} className='form-group'>
                    <label htmlFor='username'>Username</label>

                    <input
                        type='text'
                        className='form-input'
                        {...register('username')}
                        required
                    />

                </div>
                <div id={style.passwordBox} className='form-group'>
                    <label htmlFor='password'>Password</label>

                    <input
                        type='password'
                        className='form-input'
                        {...register('password')}
                        required
                    />
                </div>


                <button type='submit' className='btn btn-primary' id={style.login}>Login</button>
            </form>

            <div id={style.signup}>
                New to Portal?  <NavLink exact to="/StudentSignup"> Register</NavLink>
                <NavLink id={style.goBackLink} exact to="/"> Go Back</NavLink>
            </div>


        </div>



        //     <div id={style.emailBox}>
        //         <label htmlFor="email"> Email
        //             <input name="email"
        //                 onChange={(e) => onTextFieldChange(e)} type="text" id={style.email} />
        //         </label>
        //     </div>


        //     <div id={style.passwordBox}>
        //         <label htmlFor="password"> Password
        //             <input name="password"
        //                 onChange={(e) => onTextFieldChange(e)} type="password" id={style.password} />
        //         </label>
        //     </div>


        //     <button id={style.login} onClick={handleLogin}>Login</button>


        //     <div id={style.signup}>
        //         New to Portal?  <NavLink exact to="/StudentSignup"> Register</NavLink>
        //         <NavLink id={style.goBackLink} exact to="/"> Go Back</NavLink>
        //     </div>


        // </div >
    );
}

export default StudentLogin;
import { NavLink, useHistory } from "react-router-dom";
import React, { useEffect } from 'react'
import style from "./StudentSignup.module.css";
import { registerUser } from "../../Authentication/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";



function StudentSignup() {

    //-----------------auth slice code-----------------

    const { userInfo, success } = useSelector(
        (state) => state.auth
    )

    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    let history = useHistory();


    useEffect(() => {

        if (success) {
            alert("Your account has created, Forwarding to Student Dashboard");
            history.push("/StudentLogin")
        }
    }, [success, history, userInfo])

    const submitForm = (data) => {

        data.email = data.email.toLowerCase()
        console.log(data);
        dispatch(registerUser(data));
    }


    return (
        <div id={style.container}>

            <div id={style.formHeading}>
                <h1>Student Signup</h1>
                <p>Please complete the form below to register with us</p>
            </div>

            <form onSubmit={handleSubmit(submitForm)}>

                <div className='form-group' id={style.nameBox}>

                    <label htmlFor='username'>Username  </label>
                    <input
                        type='text'
                        className='form-input'
                        {...register('username')}
                        required
                    />

                </div>

                <div className='form-group' id={style.emailBox}>

                    <label htmlFor='email'>Email  </label>

                    <input
                        type='email'
                        className='form-input'
                        {...register('email')}
                        required
                    />

                </div>

                <div className='form-group' id={style.passwordBox}>

                    <label htmlFor='password'>Password  </label>

                    <input
                        type='password'
                        className='form-input'
                        {...register('password')}
                        required
                    />

                </div>

                <div className='form-group' id={style.confirmPasswordBox}>

                    <label htmlFor='password'>Confirm Password  </label>

                    <input
                        type='password'
                        className='form-input'
                        {...register('confirmPassword')}
                        required
                    />

                </div>

                <button type='submit' id={style.signup}  >Sign Up</button>

            </form>

            <div id={style.login}>
                Have a Account?  <NavLink exact to="/StudentLogin"> Log in</NavLink>
            </div>


        </div>
    );
}

export default StudentSignup;
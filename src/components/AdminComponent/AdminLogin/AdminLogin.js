import style from "./AdminLogin.module.css";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { userLogin } from "../../Authentication/AuthAction";
import { useEffect } from "react";

function AdminLogin() {

    let history = useHistory();

    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    const { userInfo } = useSelector((state) => state.auth)

    const success = useSelector((state) => state.auth.success)

    //--------------login authentication using redux------------------------------------

    useEffect(() => {
        if (success) history.push("/AdminDashBoard");
    }, [success])


    const submitForm = (data) => {

        dispatch(userLogin(data))
    }

    //-------------------------------------------------------------------------------------------

    return (
        <div id={style.container}>


            <div id={style.containerHeadingBox}>
                <h1>Admin Login</h1>
            </div>

            <form onSubmit={handleSubmit(submitForm)}>

                <div className='form-group' id={style.emailBox}>
                    <label htmlFor='username'>User Name</label>

                    <input
                        type='text'
                        className='form-input'
                        {...register('username')}
                        required
                    />

                </div>
                <div className='form-group' id={style.passwordBox}>
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

            <NavLink to="/" id={style.goBackLink}> Go Back</NavLink>


        </div>
    );
}

export default AdminLogin;
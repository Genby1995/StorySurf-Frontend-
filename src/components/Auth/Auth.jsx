import React from "react";
import s from "./Auth.module.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeInput, changeCurrentActivity, login as login_AC, register as register_AC } from "../../redux/authSlice";

const Auth = (props) => {

    // REDUX
    const dispatch = useDispatch();
    const register = useSelector((state) => state.auth.register)
    const login = useSelector((state) => state.auth.login)
    const loadingStatus = useSelector((state) => state.auth.status)
    const errorMessage = useSelector((state) => state.auth.error)
    const currentActivity = window.location.pathname.slice(1)

    // HANDLERS
    const handleChange = (e) => {
        dispatch(changeInput({
            inputName: e.target.name,
            inputData: e.target.value,
            activityName: currentActivity,
        }))
    }
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        dispatch(register_AC());
    }
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(login_AC());
    }
    
    // RENDER

    return (
        <div className={s.background}>
            <div className={s.container} style={currentActivity == "register"
                ? { flexDirection: "row-reverse" }
                : { flexDirection: "row" }
            }>

                {/*REGISTER INPUT HALF */}
                <div className={currentActivity == "register"
                    ? s.formContainer
                    : s.formContainer + " " + s.hidden
                }>
                    {loadingStatus == "loading"

                        ? <form
                            className={s.form}>
                            <h1>Загрузка...</h1>
                        </form>

                        :
                        <form className={s.form} onSubmit={handleSubmitRegister}>
                            <h1>Регистрация</h1>
                            {loadingStatus == "error"
                                ? <div className={s.message + " " + s.warning}>  {errorMessage} </div>
                                : <div className={s.message}>
                                    {loadingStatus == "resolved"
                                        ? "Регистрация выполнена" 
                                        : "Введите данные для регистрации"}
                                </div>
                            }
                            <input
                                name="username"
                                type='text'
                                placeholder="Введите логин"
                                onChange={handleChange}
                                value={register.username}
                                autoComplete="on"
                                className={s.inputText} />
                            <input
                                name='password'
                                type='password'
                                placeholder="Введите пароль"
                                onChange={handleChange}
                                value={register.password}
                                autoComplete="on"
                                className={s.inputText} />
                            <input
                                name='passwordVerification'
                                type='password'
                                placeholder="Поддтвердите пароль"
                                onChange={handleChange}
                                value={register.passwordVerification}
                                autoComplete="on"
                                className={s.inputText} />
                            <input
                                name="firstName"
                                type='text'
                                placeholder="Введите имя"
                                onChange={handleChange}
                                value={register.firstName}
                                className={s.inputText} />
                            <input
                                name="familyName"
                                type='text'
                                placeholder="Введите фамилию"
                                onChange={handleChange}
                                value={register.familyName}
                                className={s.inputText} />
                            <button
                                type="submit"
                                name="submit"
                                value="Отправить"
                                className={s.button}>
                                Отправить</button>
                        </form>
                    }
                </div>

                {/*LOGIN INPUT HALF */}
                <div className={currentActivity == "login"
                    ? s.formContainer
                    : s.formContainer + " " + s.hidden
                }>
                    {loadingStatus == "loading"

                        ? <form className={s.form}>
                            <h1>Загрузка...</h1>
                        </form>

                        : <form
                            className={s.form}
                            onSubmit={handleSubmitLogin}>
                            <h1>Авторизация</h1>
                            {loadingStatus == "error"
                                ? <div className={s.message + " " + s.warning}>  {errorMessage} </div>
                                : <div className={s.message}>
                                    {loadingStatus == "resolved"
                                        ? "Вход выполнен"
                                        : "Введите данные пользователя"}
                                </div>
                            }
                            <input
                                name="username"
                                type='text'
                                placeholder="Введите логин"
                                onChange={handleChange}
                                value={login.username}
                                autoComplete="on"
                                className={s.inputText} />
                            <input
                                name='password'
                                type='password'
                                placeholder="Введите пароль"
                                onChange={handleChange}
                                value={login.password}
                                autoComplete="on"
                                className={s.inputText} />
                            <button
                                type="submit"
                                name="submit"
                                value="Отправить"
                                className={s.button}>
                                Отправить</button>
                        </form>
                    }
                </div>

                {/*WELKOME HALF */}
                <div className={currentActivity == "login"
                    ? s.loginWelcome
                    : s.registerWelcome}>

                    <h1>Welcome to</h1>
                    <div className={s.logoName}>
                        <span className={s.charColor}>S</span>
                        TORY
                        <span className={s.charColor}>S</span>
                        ERF
                    </div>

                    <div> {currentActivity == "login"
                        ? `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Nulla neque sint debitis voluptate ab illum deserunt accusamus cupiditate accusantium repellendus.`
                        : `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Nulla neque sint debitis voluptate ab illum deserunt accusamus cupiditate accusantium repellendus.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.`}
                    </div>
                    <div> {currentActivity == "login"
                        ? `У вас eщё нет аккаунта в StorySerf?`
                        : `У вас уже есть аккаунт в StorySerf?`}
                    </div>
                    {currentActivity == "login"
                        ? <Link
                            to="/register"
                            className={s.button}>
                            Зарегистрироваться
                        </Link>
                        : <Link
                            to="/login"
                            className={s.button}>
                            Авторизоваться
                        </Link>
                    }
                </div>

            </div>
        </div>
    )
}

export default Auth;
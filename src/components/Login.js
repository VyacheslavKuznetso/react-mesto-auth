import React, { useState } from 'react';
import HeaderLog from '../images/Logo.svg'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {


    return (
        <>
            <div className="header">
                <img className="header__logo" src={HeaderLog} alt="Места в России" />
                <div className='header__login-container'>
                    <div to="sign-in" className='header__button'>Регистрация</div>
                </div>
            </div>
            <form className="form">
                <h2 className="form__title">Вход</h2>
                <input className="form__email" name="email" type="email" required placeholder='Email'  />
                <input className="form__password" name="password" type="password" required placeholder='Пароль'  />
                <div className="form__button-container">
                    <button className="form__button" type="submit">Войти</button>
                </div>
            </form>
        </>
    )
}

export default Login;
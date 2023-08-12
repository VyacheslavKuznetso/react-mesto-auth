import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderLog from '../images/Logo.svg'

const Register = () => {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        /* нужен запрос к серверу */(formValue.email, formValue.password)
            .then((res) => {
                navigate('/register', { replace: true });
            })
            
    }

    return (
        <>
            <div className="header">
                <img className="header__logo" src={HeaderLog} alt="Места в России" />
                <div className='header__login-container'>
                    <Link to="register" className='header__button'>Войти</Link>
                </div>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">Регистрация</h2>
                <input className="form__email" name="email" type="email" required placeholder='Email' value={formValue.email} onChange={handleChange} />
                <input className="form__password" name="password" type="password" required placeholder='Пароль' value={formValue.password} onChange={handleChange} />
                <div className="form__button-container">
                    <button className="form__button" onSubmit={handleSubmit} type="submit">Зарегистрироваться</button>
                </div>
            </form>
            <div className="register__signin">
                <p className='register__text'>Уже зарегистрированы?</p>
                <Link to="register" className="register__text">Войти</Link>
            </div>
        </>
    )
}

export default Register;
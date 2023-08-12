import React from 'react';
import HeaderLog from '../images/Logo.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Header () {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <header className="header">
            <img className="header__logo" src={HeaderLog} alt="Места в России" />
            <div className='header__login-container'>
                <h1 className='header__title'>Email</h1>
                <button className='header__button'>Выйти</button>
            </div>
        </header>
    )
}

export default Header;
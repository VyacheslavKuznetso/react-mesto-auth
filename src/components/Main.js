import React from 'react';
import api from '../utils/api'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'



function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);




    if (!currentUser) {
        return null;
    }



    return (
        <main className="content">
            <section className="block-profile">
                <div className="profile">
                    <div className="profile__coteiner-avatar">
                        <img className="profile__avatar" src={currentUser.avatar} />
                        <button className="profile__edit-avatar-button" type="button" aria-label="Редактировать аватар" id="profileEditAvatar" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__info-block">
                        <div className="profile__data">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button className="profile__edit-button" type="button" aria-label="Редактировать" id="editUser" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle" id="specially">{currentUser.about}</p>
                    </div>
                </div>
                <button className="block-profile__add-button" type="button" aria-label="Добывить" id="addContentButton" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                <CurrentUserContext.Provider value={currentUser}>
                    {props.cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))}
                </CurrentUserContext.Provider>
            </section>
        </main>
    )
}



export default Main;
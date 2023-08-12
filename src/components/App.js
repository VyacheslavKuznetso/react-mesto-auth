import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext, AppContext } from '../contexts/CurrentUserContext'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Register from './Register'
import ProtectedRouteElement from "./ProtectedRoute";



function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);


    const [currentUser, setCurrentUser] = React.useState(null) // <-- 

    const [loggedIn, setLoggedIn] = React.useState(false);

    const [cards, setCards] = React.useState([])


    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userInfo, initialCards]) => {
                setCurrentUser(userInfo);
                setCards(initialCards);
            })
            .catch(console.error);

    }, [])


    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true)

    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true)
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true)
    }


    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard(null);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleUpdateUser = ({ name, about: description }) => {
        api.postUserInfo({ name, about: description })
            .then((userInfo) => {
                setCurrentUser(userInfo)
                closeAllPopups()
            })
            .catch(console.error)
    }

    const handleUpdateAvatar = ({ avatar }) => {
        api.postUserAvatar({ avatar })
            .then((userInfo) => {
                setCurrentUser(userInfo)
                closeAllPopups()
            })
            .catch(console.error)
    }


    const handleAddPlaceSubmit = ({ name, link }) => {
        api.addCard({ name, link })
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(console.error)

    }


    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.likeCard(card._id, isLiked)
            .then((newCard) => {
                // Обновляем стейт с помощью функции, которая принимает предыдущее состояние и возвращает новое состояние
                setCards((prevCards) => {
                    // Формируем новый массив на основе предыдущего состояния, подставляя в него новую карточку
                    const newCards = prevCards.map((c) => (c._id === card._id ? newCard : c));
                    return newCards;
                });
            })
            .catch(console.error);
    }

    function handleCardDelete(card) {
        // Отправляем запрос в API для удаления карточки
        api.deleteCard(card._id)
            .then(() => {
                // Обновляем стейт, используя функцию, которая принимает предыдущее состояние и возвращает новое состояние
                setCards((prevCards) => {
                    // Фильтруем массив cards, исключая удаленную карточку
                    const updatedCards = prevCards.filter((c) => c._id !== card._id);
                    return updatedCards;
                });
            })
            .catch(console.error);
    }





    return (
        <AppContext.Provider value={loggedIn}>
            <CurrentUserContext.Provider value={currentUser}>
                <div className='page'>
                    <Header />
                    <Routes>
                        <Route path="/" element={loggedIn ? <Navigate to="/sign-up" replace /> : <Navigate to="/sign-in" replace />} />
                        <Route path='/main' element={<ProtectedRouteElement element={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />} />
                        <Footer />
                        <Route path='/sign-in' element={<Login />} />
                        <Route path='/sign-up' element={<Register />} />
                    </Routes>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateAddCard={handleAddPlaceSubmit} />
                    <PopupWithForm name="delete" nameId="delete" formId="deleteForm" title="Вы уверены?" submitButtonLabel="Да" ></PopupWithForm>
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </div>
            </CurrentUserContext.Provider>
        </AppContext.Provider>

    );
}

export default App;

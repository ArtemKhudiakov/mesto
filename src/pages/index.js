import "./index.css"

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js"
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import {
  validationSettings,
  buttonEditForm,
  buttonPlaceForm,
  buttonAvatarForm,
  popupEdit,
  popupPlace,
  popupImage,
  popupAvatar,
  popupConfirm,
  buttonEditAvatar,
  buttonAddPlace,
  editButton,
  popupEditName,
  popupEditDescription,
  templateSelector,
  elements,
} from '../utils/constants.js';

let userId = null

// Валидация
const profileFormValidation = new FormValidator(validationSettings, buttonEditForm)
const placeFormValidation = new FormValidator(validationSettings, buttonPlaceForm)
const avatarFormValidation = new FormValidator(validationSettings, buttonAvatarForm)

avatarFormValidation.enableValidation();
profileFormValidation.enableValidation();
placeFormValidation.enableValidation();

// Создание информации из профиля
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
});

// API
//

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '6a3dc8fc-cbc8-4cee-b5dd-4c0b0fbbc466',
    'Content-Type': 'application/json'
  }
});


const userServerInfo = api.getUserInfoServer();
const initialServerCards = api.getInitialCards();

Promise.all([userServerInfo, initialServerCards])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userData._id;
    cardsSection.renderAll(initialCards)
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

// Cards section
const cardsSection = new Section({
  items: [],
  renderer: (item) => {
    const card = makeCard(item);
    cardsSection.addItem(card);
  }
}, elements);

// Popup edit profile
const typePopupEditProfile = new PopupWithForm(popupEdit, {
  handleSubmit: (userData) => {
    typePopupEditProfile.buttonText(true);
    api.editUserInfo(userData)
      .then((res) => {
        userInfo.setUserInfo(res);
        typePopupEditProfile.close();

      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        typePopupEditProfile.buttonText(false)
      })
  }
});

// Popup edit profile open
function openEditProfile() {
  const userData = userInfo.getUserInfo();
  popupEditName.value = userData.name;
  popupEditDescription.value = userData.info;
  profileFormValidation.disableButton();
  profileFormValidation.resetError();
  typePopupEditProfile.open();
}

// Create new card
function makeCard(item) {
  const card = new Card(item, templateSelector,
    () => {typePopupImage.open(item)}, handleDeleteCard, handleLikesOnServer, userId);
  const newCard = card.createCard()
  return newCard;
};

// Popup new avatar
const typePopupAvatar = new PopupWithForm(popupAvatar, {
  handleSubmit: (data) => {
    typePopupAvatar.buttonText(true);
    api.setUserAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        typePopupAvatar.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        typePopupAvatar.buttonText(false)
      })
  }
});

const typePopupImage = new PopupWithImage(popupImage);

// Popup new place
const typePopupNewPlace = new PopupWithForm(popupPlace, {
  handleSubmit: (data) => {
    typePopupNewPlace.buttonText(true);
    api.addNewCard(data)
      .then((data) => {
        const card = makeCard(data);
        cardsSection.addItem(card);
        typePopupNewPlace.close();

      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        typePopupNewPlace.buttonText(false)
      })
  }
});

// New card open
function createNewPlace() {
  placeFormValidation.disableButton();
  placeFormValidation.resetError();
  typePopupNewPlace.open();
}


function updateAvatar() {
  avatarFormValidation.disableButton();
  avatarFormValidation.resetError();
  typePopupAvatar.open();
}

// Approve deleting card
const typePopupConfirm = new PopupWithConfirm(popupConfirm, {
  handleClick: (data) => {
    api
      .deleteCard(data)
      .then(() => {
        typePopupConfirm.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }
});

// Opening deleting popup
function handleDeleteCard(card) {
  typePopupConfirm.open();
  typePopupConfirm.changeHandleSubmit(() => {
    handleSubmitDeleteForm(card);
  })
}
// Deleting card via api
function handleSubmitDeleteForm(card) {
  api.deleteCard(card._id)
    .then(() => {
      card.deleteCard();
      typePopupConfirm.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
}

// Changing likes on the server
function handleLikesOnServer(card) {
  if (card.isLiked()) {
    api.dislikeCard(card._id)
      .then((data) => {
        card.removeLikeClass();
        card.setCount(data.likes);
      })
      .catch((err) => console.log(`Ошибка: ${err}`))

  } else {

    api.likeCard(card._id)
      .then((data) => {
        card.addLikeClass();
        card.setCount(data.likes);
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }
}

// Listeners
typePopupImage.setEventListeners();
typePopupNewPlace.setEventListeners();
typePopupEditProfile.setEventListeners();
typePopupAvatar.setEventListeners();
typePopupConfirm.setEventListeners();

// Button listeners
editButton.addEventListener('click', openEditProfile);
buttonAddPlace.addEventListener('click', createNewPlace);
buttonEditAvatar.addEventListener('click', updateAvatar);

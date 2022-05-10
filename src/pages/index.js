import "./index.css"

// import { initialCards } from "../utils/cards.js"
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js"
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import { validationSettings,
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
const userInfo = new UserInfo ({
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
console.log(userServerInfo);
const initialServerCards = api.getInitialCards();
console.log(initialServerCards);

Promise.all([userServerInfo, initialServerCards])
   .then(([userData, initialCards]) => {
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData);
      userId = userData._id;
      console.log(userId);
      console.log(initialCards);
      console.log(cardsSection);

      initialCards.forEach((item => {
      cardsSection.addItem(makeCard(item));
      }));

      })
   .catch((err) => console.log(`Ошибка загрузки: ${err}`));

// Секция карточек
const cardsSection = new Section({
  items: [],
  renderer: (item) => {
    const card = makeCard(item);
    cardsSection.addItem(card);
  }
}, elements);

// Создание попапа редактирования профиля
const typePopupEditProfile = new PopupWithForm(popupEdit,
  {
    handleSubmit: (userData) => {
    // userInfo.setUserInfo(userData);
    api.editUserInfo(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
      typePopupEditProfile.close();
      profileFormValidation.buttonText(true);
    })
    .catch(err => {
      console.log(err);
    })
    }
  }
);

// Функция открытия редактирования профиля
function openEditProfile() {
  const userData = userInfo.getUserInfo();
  popupEditName.value = userData.name;
  popupEditDescription.value = userData.info;
  profileFormValidation.disableButton();
  profileFormValidation.resetError();
  profileFormValidation.buttonText(false);
  typePopupEditProfile.open();
}

// Функция создания новой карточки
function makeCard(item) {
  const card = new Card(item, templateSelector,
    () => {typePopupImage.open(item)}, handleDeleteCard, handleLikesOnServer, userId);
  const newCard = card.createCard()
  return newCard;
};

// Создание попапа редактирования аватара
const typePopupAvatar = new PopupWithForm(popupAvatar,
  {
    handleSubmit: (data) => {
    api
      .setUserAvatar(data)
      .then((res) => {
      userInfo.setUserAvatar(res);
      typePopupAvatar.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  }
});

const typePopupImage = new PopupWithImage(popupImage);

// Создание попапа создания карточки
const typePopupNewPlace = new PopupWithForm(popupPlace,
  {
    handleSubmit: (data) => {
      api
        .addNewCard(data)
        .then((data) => {

    const card = makeCard(data);
    cardsSection.addItem(card);
    typePopupNewPlace.close();
    placeFormValidation.buttonText(true);
    })
    .catch((error => {
      console.log(error);
    }))
  }
  }
);


// Функция открытия создания новой карточки
function createNewPlace() {
  placeFormValidation.disableButton();
  placeFormValidation.resetError();
  placeFormValidation.buttonText(false);
  typePopupNewPlace.open();
}


function updateAvatar() {
  avatarFormValidation.disableButton();
  avatarFormValidation.resetError();
  typePopupAvatar.open();
}

// Aprove deleting card
const typePopupConfirm = new PopupWithConfirm(popupConfirm,
  {
    handleClick: (data) => {
    api
      .deleteCard(data)
      .then(() => {

      card.deleteCard();
      typePopupConfirm.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  }
});

// Opening deleting popup
function handleDeleteCard(card) {
  console.log(card);
  typePopupConfirm.open();
  typePopupConfirm.changeHandleSubmit(() => {
    handleSubmitDeleteForm(card);
    console.log('карточка');
    console.log(card);
  })
}
// Deleting card via api
function handleSubmitDeleteForm(card) {
  console.log(card)
  console.log(card._id)
  api.deleteCard(card._id)
  .then(() => {
    card.deleteCard();
    typePopupConfirm.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
}

function handleLikesOnServer(card) {

  console.log(card);
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

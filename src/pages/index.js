import "./index.css"

// import { initialCards } from "../utils/cards.js"
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js"
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
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
  buttonEditAvatar,
  popupConfirm,
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
// const avatarFormValidation = new FormValidator(validationSettings, buttonAvatarForm)

// avatarFormValidation.enableValidation();
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

const api = new Api({
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
  typePopupEditProfile.open();
}

// Функция создания новой карточки
function makeCard(item) {
  const card = new Card(item, templateSelector,
    () => {typePopupImage.open(item)});
  const newCard = card.createCard()
  return newCard;
};


// cardsSection.renderAll();

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
    const card = makeCard(data);
    cardsSection.addItem(card);
    typePopupNewPlace.close();
  }
});

// Функция открытия создания новой карточки
function createNewPlace() {
  placeFormValidation.disableButton();
  placeFormValidation.resetError();
  typePopupNewPlace.open();
}

typePopupImage.setEventListeners();
typePopupNewPlace.setEventListeners();
typePopupEditProfile.setEventListeners();
typePopupAvatar.setEventListeners();

// Слушатели на кнопки
editButton.addEventListener('click', openEditProfile);
buttonAddPlace.addEventListener('click', createNewPlace);
buttonEditAvatar.addEventListener('click', updateAvatar);

function updateAvatar() {
  // avatarFormValidation.disableButton();
  // avatarFormValidation.resetError();
  // avatarInput.value = userAvatar;
  // validateFormEditAvatar.toggleButtonState();
  typePopupAvatar.open();
}





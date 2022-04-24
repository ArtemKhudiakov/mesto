import "./index.css"

import { initialCards } from "../utils/cards.js"
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js"
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

import { validationSettings,
  buttonEditForm,
  buttonPlaceForm,
  popupEdit,
  popupPlace,
  popupImage,
  buttonAddPlace,
  editButton,
  popupEditName,
  popupEditDescription,
  templateSelector,
  elements,
} from '../utils/constants.js';

// Валидация
const profileFormValidation = new FormValidator(validationSettings, buttonEditForm)
const placeFormValidation = new FormValidator(validationSettings, buttonPlaceForm)

profileFormValidation.enableValidation();
placeFormValidation.enableValidation();

// Создание информации из профиля
const userInfo = new UserInfo ({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description',
});

// Создание попапа редактирования профиля
const typePopupEditProfile = new PopupWithForm(popupEdit,
  {
    handleSubmit: (userData) => {
    userInfo.setUserInfo(userData);

    typePopupEditProfile.close();
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

// Секция карточек
const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = makeCard(item);
    cardsSection.addItem(card);
  }
}, elements);

cardsSection.renderAll();

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

// Слушатели на кнопки
editButton.addEventListener('click', openEditProfile);
buttonAddPlace.addEventListener('click', createNewPlace);

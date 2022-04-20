import { initialCards } from "../utils/cards"
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
  profileName,
  profileInfo,
  popupEditName,
  popupEditDescription,
  formElementEdit,
  formElementPlace,
  popupNewPlace,
  popupNewUrl,
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
})

// Создание попапа редактирования профиля
const typePopupEditProfile = new PopupWithForm(popupEdit,
  {
    handleSubmit: (data) => {
    userInfo.setUserInfo(data);
    typePopupEditProfile.close();
  }
});

// Функция открытия редактирования профиля
function openEditProfile() {
  const userData = userInfo.getUserInfo();
  popupEditName.value = userData.name;
  popupEditDescription.value = userData.info;
  typePopupEditProfile.open();
}

// Создание попапа создания карточки
const typePopupNewPlace = new PopupWithForm(popupPlace,
  {
    handleSubmit: (data) => {
    cardsSection.addItem(data);
    typePopupNewPlace.close();
  }
});












// Функция открытия создания новой карточки
function createNewPlace() {
  typePopupNewPlace.open();
}

// Рендер карточки
function renderCard(card) {
  const newCard = new Card(card, templateSelector, handlePreview);
  const cardElement = newCard.createCard();
  elements.prepend(cardElement);
}

// Функция нового места
function submitNewPlaceForm (evt,settings) {
  evt.preventDefault();
  const disabledButton = formElementPlace.querySelector('.popup__save');
  const newCardObject = {
    name: popupNewPlace.value,
    link: popupNewUrl.value,
    alt: popupNewPlace.value,
  };
  renderCard(newCardObject);
  closePopup(popupPlace);
  formElementPlace.reset();
  disabledButton.classList.add('popup__save_inactive');
  disabledButton.setAttribute('disabled', true);
}

// Следим за кнопкой отправить
formElementEdit.addEventListener('submit', submitEditForm);
formElementPlace.addEventListener('submit', submitNewPlaceForm);

// Создание перебором всех карточек
initialCards.forEach(function (element) {
    renderCard(element)
});


// Слушатели
editButton.addEventListener('click', openEditProfile);
buttonAddPlace.addEventListener('click', createNewPlace);

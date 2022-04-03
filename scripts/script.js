import { FormValidator } from "./FormValidator.js";

const editButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const popupEditName = document.querySelector('.popup__edit-input_type_name');
const popupEditDescription = document.querySelector('.popup__edit-input_type_description');
const formElementEdit = document.querySelector('.edit-popup__form');
const formElementPlace = document.querySelector('.place-popup__form');
const popupNewPlace = document.querySelector('.popup__edit-input_type_place');
const popupNewUrl = document.querySelector('.popup__edit-input_type_url');

const addPlace = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.edit-popup');
const popupPlace = document.querySelector('.place-popup');
const popupImage = document.querySelector('.popup-image');

const cardTemplate = document.querySelector('#card-template').content;
const elements = document.querySelector('.elements');

const bigImageTitle = document.querySelector('.popup-image__title');
const bigImageUrl = document.querySelector('.popup-image__url');

const closeButtons = document.querySelectorAll('.popup__close-button');

// Объект Валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__edit-input',
  buttonSelector: '.popup__save',
  inputClosestSelector: '.popup__input',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: '.popup__edit-input-error',
  errorClass: 'popup__edit-input-error_active'
}

// Запуск валидации
const forms = Array.from(document.forms);
forms.forEach((form) => {
  const validator = new FormValidator(validationSettings, form);
  validator.enableValidation();
})

// Перебор массива, навешивание на них слушателя и передача колбека с аргументом
closeButtons.forEach((item) => {
  item.addEventListener('click', () => closePopup(item.closest('.popup')));
});

// Функция открыть редактирование профиля
function openEditProfile() {
  popupEditName.value = profileName.textContent;
  popupEditDescription.value = profileInfo.textContent;
  openPopup(popupEdit)
}

// Функция изменения имени и информации о себе
function submitEditForm (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditName.value;
    profileInfo.textContent = popupEditDescription.value;
    closePopup(popupEdit);
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

// Открытие и закрытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscape);
  popup.addEventListener('mousedown', closeOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscape);
  popup.removeEventListener('mousedown', closeOverlay);
}

// Создание карточки из шаблона
function createCard (item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  cardElement.querySelector('.element__like').addEventListener('click', doLike);
  cardElement.querySelector('.element__trash').addEventListener('click', () => { cardElement.remove(); });
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardImage.addEventListener('click', function () {
  openPopup(popupImage)
  bigImageTitle.textContent = item.name;
  bigImageUrl.src = item.link;
  bigImageUrl.alt = item.name;
  });
  return cardElement
}

// Рендер карточки
function renderCard(card) {
  elements.prepend(createCard(card));
}

// Создание перебором всех карточек
function createCards() {
  initialCards.forEach(function (element) {
    renderCard(element)
});
}

// Создать новое место
function createNewPlace() {
  openPopup(popupPlace);
}

// Сделать лайк
function doLike(event) {
  const elementLike = event.target;
  elementLike.classList.toggle('element__like_active');
}

// Слушатели
editButton.addEventListener('click', openEditProfile);
addPlace.addEventListener('click', createNewPlace);

createCards(initialCards);

// Закрыть по кнопке Esc
function closeEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Закрыть по оверлей
function closeOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

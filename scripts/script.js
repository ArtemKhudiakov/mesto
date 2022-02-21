let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__description');
let popupEditName = document.querySelector('.popup__part_name');
let popupEditDescription = document.querySelector('.popup__part_description');
let formElement = document.querySelector('.popup__form');

function openEdit() {
  popup.classList.add('popup__opened');

  // Загрузка текущих данных в попап
  popupEditName.value = profileName.textContent;
  popupEditDescription.value = profileInfo.textContent;
}

function closeEdit() {
  popup.classList.remove('popup__opened');
}

// Открытие и закрытие попапа Редактировать профиль
editButton.addEventListener('click', openEdit);
closeButton.addEventListener('click', closeEdit);

// Функция изменения именя и информации о себе
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditName.value;
    profileInfo.textContent = popupEditDescription.value;
    closeEdit()
}

// Следим за кнопкой отправить
formElement.addEventListener('submit', formSubmitHandler);


// Template и получение карточек
const initialCards = [
  {
    name: 'Архыз',
    alternative: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    alternative: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    alternative: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    alternative: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    alternative: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    alternative: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const cardTemplate = document.querySelector('#card-template').content;
const elements = document.querySelector('.elements');

initialCards.forEach( function (item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = item.link;
  cardElement.querySelector('.element__image').alt = item.alternative;
  cardElement.querySelector('.element__title').textContent = item.name;
  elements.append(cardElement);
});


// Попап добавить место
let addPlace = document.querySelector('.profile__add-button');


// Открытие и закрытие попапа Добавить место
addPlace.addEventListener('click', openEdit);
closeButton.addEventListener('click', closeEdit);

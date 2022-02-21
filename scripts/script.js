let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__description');
let popupEditName = document.querySelector('.popup__edit-input_type_name');
let popupEditDescription = document.querySelector('.popup__edit-input_type_description');
let formElement = document.querySelector('.popup__form');

function openEditProfile() {
  const popup = document.querySelector('.edit-popup');
  popupEditName.value = profileName.textContent;
  popupEditDescription.value = profileInfo.textContent;
  openPopup(popup)
}

// Слушатель Редактировать профиль
editButton.addEventListener('click', openEditProfile);

// Кнопка закрытия попапа
closeButton.addEventListener('click', closePopup);

// Функция изменения имени и информации о себе
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditName.value;
    profileInfo.textContent = popupEditDescription.value;
    closePopup(evt);
}

// Следим за кнопкой отправить
formElement.addEventListener('submit', formSubmitHandler);

// Открытие и закрытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(event) {
  event.preventDefault();
  event.target.closest('.popup').classList.remove('popup_opened');
  console.log(event.target)
}


//
//
//
// Template и получение карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#card-template').content;
const elements = document.querySelector('.elements');

// Создание карточки из шаблона
function createCard (item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  cardElement.querySelector('.element__like').addEventListener('click', doLike);
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  elements.append(cardElement);
}

// Создание перебором всех карточек
function createCards() {
  initialCards.forEach(function (element) {
  createCard(element)}
);
}

createCards(initialCards);






// // Попап добавить место
let addPlace = document.querySelector('.profile__add-button');


addPlace.addEventListener('click', createNewPlace);

function createNewPlace() {
  const popup = document.querySelector('.place-popup');
  console.log(popup);
  openPopup(popup);

}

//Сделать лайк
function doLike(event) {
  const elementLike = event.target;
  elementLike.classList.toggle('element__like_active');
}



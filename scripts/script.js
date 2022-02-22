const editButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const popupEditName = document.querySelector('.popup__edit-input_type_name');
const popupEditDescription = document.querySelector('.popup__edit-input_type_description');
const formElement = document.querySelector('.popup__form');
const formElementPlace = document.querySelector('.place-popup__form');
const popupNewPlace = document.querySelector('.popup__edit-input_type_place');
const popupNewUrl = document.querySelector('.popup__edit-input_type_url');


function openEditProfile() {
  const popup = document.querySelector('.edit-popup');
  popupEditName.value = profileName.textContent;
  popupEditDescription.value = profileInfo.textContent;
  openPopup(popup)
}

// Слушатель Редактировать профиль
editButton.addEventListener('click', openEditProfile);

// Функция изменения имени и информации о себе
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditName.value;
    profileInfo.textContent = popupEditDescription.value;
    closePopup(evt);
}
// Функция нового места
function formSubmitPlace (evt) {
  evt.preventDefault();
  const newCardObject = {
    name: popupNewPlace.value,
    link: popupNewUrl.value,
    alt: popupNewPlace.value,
  };
  createCard(newCardObject);
  closePopup(evt);
}


// Следим за кнопкой отправить
formElement.addEventListener('submit', formSubmitHandler);
formElementPlace.addEventListener('submit', formSubmitPlace);




// Открытие и закрытие попапа
function openPopup(popup) {
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopup);
  popup.classList.add('popup_opened');
}

function closePopup(event) {
  console.log('111'+ event.target)
  event.target.closest('.popup').classList.remove('popup_opened');
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
  cardElement.querySelector('.element__trash').addEventListener('click', () => { cardElement.remove(); });

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  elements.prepend(cardElement);

  cardImage.addEventListener('click', function () {
  const bigImage = document.querySelector('.popup-image');
  const bigImageTitle = document.querySelector('.popup-image__title');
  const bigImageUrl = document.querySelector('.popup-image__url');
  const bigImageDelete = document.querySelector('.popup-image__close-button');
  bigImage.classList.add('popup_opened');
  bigImageTitle.textContent = item.name;
  bigImageUrl.src = item.link;

  bigImageDelete.addEventListener('click', () => bigImage.classList.remove('popup_opened'));
  });

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


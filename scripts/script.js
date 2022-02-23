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
    closePopup(evt);
}

// Функция нового места
function submitNewPlaceForm (evt) {
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
formElementEdit.addEventListener('submit', submitEditForm);
formElementPlace.addEventListener('submit', submitNewPlaceForm);

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

  const bigImageTitle = document.querySelector('.popup-image__title');
  const bigImageUrl = document.querySelector('.popup-image__url');
  const bigImageDelete = document.querySelector('.popup-image__close-button');
  popupImage.classList.add('popup_opened');
  bigImageTitle.textContent = item.name;
  bigImageUrl.src = item.link;

  bigImageDelete.addEventListener('click', () => popupImage.classList.remove('popup_opened'));
  });
}

// Создание перебором всех карточек
function createCards() {
  initialCards.forEach(function (element) {
  createCard(element)}
);
}

// Создать новое место
function createNewPlace() {

  console.log(popupPlace);
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

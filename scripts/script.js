let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__description');
let popupEditName = document.querySelector('.popup__name');
let popupEditDescription = document.querySelector('.popup__description');
let formElement = document.querySelector('.popup__form');

function openEdit() {
  popup.classList.add('popup__opened');
}

function closeEdit() {
  popup.classList.remove('popup__opened');
}

// Открытие попапа
editButton.addEventListener('click', openEdit);
closeButton.addEventListener('click', closeEdit);

// Загрузка текущих данных в попап
popupEditName.value = profileName.textContent;
popupEditDescription.value = profileInfo.textContent;



// Функция изменения именя и информации о себе
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditName.value;
    profileInfo.textContent = popupEditDescription.value;
    closeEdit()
}

// Следим за кнопкой отправить
formElement.addEventListener('submit', formSubmitHandler);

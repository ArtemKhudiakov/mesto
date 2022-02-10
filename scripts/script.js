let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__description');
let popupEditName = document.querySelector('.popup__edit-input_type_name');
let popupEditDescription = document.querySelector('.popup__edit-input_type_description');
let formElement = document.querySelector('.popup__form');

function openEdit() {
  popup.classList.add('popup_opened');
  popupEditName.value = profileName.textContent;
}

function closeEdit() {
  popup.classList.remove('popup_opened');
}

// Открытие попапа
editButton.addEventListener('click', openEdit);
closeButton.addEventListener('click', closeEdit);

// Загрузка текущих данных в попап
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

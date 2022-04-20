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

const UserInfo = new UserInfo ({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description',
})



const profileFormValidation = new FormValidator(validationSettings, buttonEditForm)
const placeFormValidation = new FormValidator(validationSettings, buttonPlaceForm)

profileFormValidation.enableValidation();
placeFormValidation.enableValidation();

// // Перебор массива, навешивание на них слушателя и передача колбека с аргументом
// closeButtons.forEach((item) => {
//   item.addEventListener('click', () => closePopup(item.closest('.popup')));
// });

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

const handlePreview = (name, link) => {
  openPopup(popupImage)
  bigImageTitle.textContent = name;
  bigImageUrl.src = link;
  bigImageUrl.alt = name;
  };

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

// Открытие и закрытие попапа
// export function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeEscape);
//   popup.addEventListener('mousedown', closeOverlay);
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeEscape);
//   popup.removeEventListener('mousedown', closeOverlay);
// }

// Создание перебором всех карточек
initialCards.forEach(function (element) {
    renderCard(element)
});

// Создать новое место
function createNewPlace() {
  openPopup(popupPlace);
}

// Слушатели
editButton.addEventListener('click', openEditProfile);
buttonAddPlace.addEventListener('click', createNewPlace);

// // Закрыть по кнопке Esc
// function closeEscape(event) {
//   if (event.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// // Закрыть по оверлей
// function closeOverlay(event) {
//   if (event.target === event.currentTarget) {
//     closePopup(event.target);
//   }
// }

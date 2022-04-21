
export const editButton = document.querySelector('.profile__edit');
export const profileName = document.querySelector('.profile__name');
export const profileInfo = document.querySelector('.profile__description');
export const popupEditName = document.querySelector('.popup__edit-input_type_name');
export const popupEditDescription = document.querySelector('.popup__edit-input_type_description');
export const formElementEdit = document.querySelector('.edit-popup__form');
export const formElementPlace = document.querySelector('.place-popup__form');
export const popupNewPlace = document.querySelector('.popup__edit-input_type_place');
export const popupNewUrl = document.querySelector('.popup__edit-input_type_url');

export const buttonAddPlace = document.querySelector('.profile__add-button');

export const popupEdit = document.querySelector('.edit-popup');
export const popupPlace = document.querySelector('.place-popup');
export const popupImage = document.querySelector('.popup-image');

export const elements = document.querySelector('.elements');

export const bigImageTitle = document.querySelector('.popup-image__title');
export const bigImageUrl = document.querySelector('.popup-image__url');

export const closeButtons = document.querySelectorAll('.popup__close-button');

export const templateSelector = '#card-template';

// Объект Валидации
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__edit-input',
  buttonSelector: '.popup__save',
  inputClosestSelector: '.popup__input',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: '.popup__edit-input-error',
  errorClass: 'popup__edit-input-error_active'
}

export const buttonEditForm = popupEdit.querySelector('.popup__form');
export const buttonPlaceForm = popupPlace.querySelector('.popup__form');

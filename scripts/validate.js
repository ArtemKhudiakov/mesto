// Валидация
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__edit-input',
  buttonSelector: '.popup__save',
  inputClosestSelector: '.popup__input',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: '.popup__edit-input-error',
  errorClass: 'popup__edit-input-error_active'
}

// Обработчик всем формам перебором массива форм
const enableValidation = (settings) => {

  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, settings);

  });
};

// Обработчик всем полям формы перебором массива
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.buttonSelector);
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (evt) => {

      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);

    });
  });
};

// Проверка валидности поля
const isValid = (formElement, inputElement, settings) => {
  const isNotValid = !inputElement.validity.valid;

  if (isNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage, settings);
  } else {
    hideError(formElement, inputElement, settings);
  }
};

// Показать сообщение ошибки
const showError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = inputElement.closest(settings.inputClosestSelector).querySelector(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Скрыть сообщение ошибки
const hideError = (formElement, inputElement, settings) => {
  const errorElement = inputElement.closest(settings.inputClosestSelector).querySelector(settings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
};

// Переключение кнопки
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

// Проверяем поле на все валидности
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

enableValidation(validationSettings);

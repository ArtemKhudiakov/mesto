// Валидация

// Обработчик всем формам перебором массива форм
const enableValidation = () => {

  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);

  });
};

// Обработчик всем полям формы перебором массива
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__edit-input'));
  const buttonElement = formElement.querySelector('.popup__save');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (evt) => {

      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);

    });
  });
};

// Проверка валидности поля
const isValid = (formElement, inputElement) => {
  const isNotValid = !inputElement.validity.valid;

  if (isNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

// Показать сообщение ошибки
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = inputElement.closest('.popup__input').querySelector('.popup__edit-input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__edit-input-error_active');
};

// Скрыть сообщение ошибки
const hideError = (formElement, inputElement) => {
  const errorElement = inputElement.closest('.popup__input').querySelector('.popup__edit-input-error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__edit-input-error_active');
};

// Переключение кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__save_inactive');
    buttonElement.removeAttribute('disabled');
  }
};

// Проверяем поле на все валидности
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

enableValidation();

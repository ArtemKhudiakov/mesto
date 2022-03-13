// Валидация

// Обработчик всем формам перебором массива форм
const enableValidation = () => {

  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);

  });
};

enableValidation();
console.log(document.forms)


// Обработчик всем полям формы перебором массива
const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll('.popup__edit-input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {

      isValid(formElement, inputElement)

    });
  });
};

// Проверка валидности поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {

    showError(formElement, inputElement, inputElement.validationMessage);
  } else {

    hideError(formElement, inputElement);
  }
};

// Показать сообщение ошибки
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = inputElement.closest('.popup__input').querySelector('.popup__edit-input-error');

  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
};

// Скрыть сообщение ошибки
const hideError = (formElement, inputElement) => {
  const errorElement = inputElement.closest('.popup__input').querySelector('.popup__edit-input-error');

  inputElement.classList.remove('form__input_type_error');
  errorElement.textContent.reset;
};


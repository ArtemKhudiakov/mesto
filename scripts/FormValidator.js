class FormValidator {

  constructor(validitySettings, form) {
    this._validitySettings = validitySettings;
    this._form = form;
  };

  // Обработчик всем формам перебором массива форм
  enableValidation() {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  // Обработчик всем полям формы перебором массива
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validitySettings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validitySettings.buttonSelector);
    toggleButtonState(inputList, buttonElement, this._validitySettings);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', (evt) => {

        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);

      });
    });
  };

  // Проверка валидности поля
  _isValid (inputElement) {
    const isNotValid = !inputElement.validity.valid;

    if (isNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showError(inputElement, errorMessage);
    } else {
      this._hideError(inputElement);
    }
};

  // Переключение кнопки
    _toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validitySettings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._validitySettings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  // Показать сообщение ошибки
  _showError (inputElement, errorMessage) {
    const errorElement = inputElement.closest(this._validitySettings.inputClosestSelector).querySelector(this._validitySettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validitySettings.errorClass);
};

// Скрыть сообщение ошибки
  _hideError(inputElement) {
    const errorElement = inputElement.closest(this._validitySettings.inputClosestSelector).querySelector(this._validitySettings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validitySettings.errorClass);
};


}


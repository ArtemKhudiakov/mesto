export class FormValidator {

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
    this._inputList = Array.from(this._form.querySelectorAll(this._validitySettings.inputSelector));
    this._buttonElement = this._form.querySelector(this._validitySettings.buttonSelector);
    this.toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {

        this._isValid(inputElement);
        this.toggleButtonState();

      });
    });
  };

  // Проверка валидности поля
  _isValid(inputElement) {
    const isNotValid = !inputElement.validity.valid;

    if (isNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showError(inputElement, errorMessage);
    } else {
      this._hideError(inputElement);
    }
};

  disableButton() {
    this._buttonElement.classList.add(this._validitySettings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  // Переключение кнопки
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton()
    } else {
      this._buttonElement.classList.remove(this._validitySettings.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };

  // Проверяем поле на все валидности
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {

      return !inputElement.validity.valid;
    })
  };

  // Показать сообщение ошибки
  _showError(inputElement, errorMessage) {
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
// Очистить возможные ошибки в форме
  resetError() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
};
}

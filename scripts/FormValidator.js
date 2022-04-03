class FormValidator {

  constructor(validitySettings, formElement) {
    this._validitySettings = validitySettings;
    this._formElement = formElement;
  };

  // Обработчик всем формам перебором массива форм
  enableValidation() {

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(formElement, settings);
  };

  // Обработчик всем полям формы перебором массива
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validitySettings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validitySettings.buttonSelector);
    toggleButtonState(inputList, buttonElement, this._validitySettings);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', (evt) => {

        isValid(this._formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);

      });
    });
  };
  
  // Проверка валидности поля
  isValid = (formElement, inputElement, settings) => {
    const isNotValid = !inputElement.validity.valid;

    if (isNotValid) {
      const errorMessage = inputElement.validationMessage;
      showError(formElement, inputElement, errorMessage, settings);
    } else {
      hideError(formElement, inputElement, settings);
    }
};



}


class FormValidator {

  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  // Обработчик всем формам перебором массива форм
  enableValidation = (settings) => {

  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, settings);

  });
};

}


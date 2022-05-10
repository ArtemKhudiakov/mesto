import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleSubmit}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__edit-input');
    this._buttonElement = this._popup.querySelector('.popup__save');
    this._defaultButtonText = this._buttonElement.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input =>
      inputValues[input.name] = input.value);

    return inputValues;

  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit(this._getInputValues());
      // console.log(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  buttonText(save) {
    if (save) {
      this._buttonElement.textContent = 'Сохранение...'
    } else {
      this._buttonElement.textContent = this._defaultButtonText;
    }
  }
}

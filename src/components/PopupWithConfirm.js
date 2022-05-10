import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._confirmButton = this._popup.querySelector('.popup__save');

  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleSubmit();
    }
      );
  }

  changeHandleSubmit(newSubmit) {
    this._handleSubmit = newSubmit;
  }
}


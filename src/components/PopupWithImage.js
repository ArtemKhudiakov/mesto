import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._bigImageTitle = this._popup.querySelector('.popup-image__title');
    this._bigImageUrl = this._popup.querySelector('.popup-image__url');
  }

  open(item) {
    super.open();
    this._bigImageTitle.textContent = item.name;
    this._bigImageUrl.src = item.link;
    this._bigImageUrl.alt = item.name;
  }
}


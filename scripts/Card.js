export class Card {
  constructor(data, cardTemplateSelector) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = data.name;
    this._link = data.link;
  }

  createCard () {
    const cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    cardElement.querySelector('.element__like').addEventListener('click', doLike);
    cardElement.querySelector('.element__trash').addEventListener('click', () => { cardElement.remove(); });
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    cardImage.addEventListener('click', function () {
    openPopup(popupImage)
    bigImageTitle.textContent = this._name;
    bigImageUrl.src = this._link;
    bigImageUrl.alt = this._name;
    });
    return cardElement
  }

  // Сделать лайк
  _doLike(event) {
    const elementLike = event.target;
    elementLike.classList.toggle('element__like_active');

    

}

}


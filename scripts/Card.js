export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  createCard () {
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.element__image');
    const cardTitle = this._cardElement.querySelector('.element__title');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  // Сделать лайк
  _doLike(event) {
    const elementLike = event.target;
    elementLike.classList.toggle('element__like_active');
  }
  // Удалить карточку
  _deleteCard = () => {
    this._cardElement.remove();
  };

  //
  _setEventListeners() {
    this._cardElement.querySelector('.element__like').addEventListener('click', this._doLike);
    this._cardElement.querySelector('.element__trash').addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
  }
}


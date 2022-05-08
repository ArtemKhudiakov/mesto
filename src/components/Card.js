export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, userId) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._trashButton = this._cardElement.querySelector('.element__trash')
    this._likeCount = this._cardElement.querySelector('.element__likes-count')
  }
  // Сделать карточку
  createCard () {
    this._cardImage = this._cardElement.querySelector('.element__image');
    const cardTitle = this._cardElement.querySelector('.element__title');
    this._elementLike = this._cardElement.querySelector('.element__like');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  // Сделать лайк
  _handleLikeClick = () => {
    this._elementLike.classList.toggle('element__like_active');
  }
  // Удалить карточку
  _handleDeleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  //Повесить слушателей
  _setEventListeners() {
    this._elementLike.addEventListener('click', this._handleLikeClick);
    this._trashButton.addEventListener('click', this._handleDeleteCard);
    this._cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
  }

  _checkOwnLike() {
    this.data.likes.forEach((likeOwner) => {
      if (likeOwner._id !== this._userId) {
        this.addLikeClass();
      }
    })
  }

  setCount(data) {
    this._likeCount.textContent = data.likes.length;
  }

}


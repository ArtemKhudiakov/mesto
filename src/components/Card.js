export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeleteCard, handleLikesOnServer, userId) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerCardID = data.owner._id;
    this._id= data._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikesOnServer = handleLikesOnServer;
    this._data = data;
    this._trashButton = this._cardElement.querySelector('.element__trash')
    this._likeCount = this._cardElement.querySelector('.element__likes-count')
  }
  // Card creation
  createCard () {
    this._cardImage = this._cardElement.querySelector('.element__image');
    const cardTitle = this._cardElement.querySelector('.element__title');
    this._elementLike = this._cardElement.querySelector('.element__like');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();
    this.setCount(this._likes);
    this._checkMyLike();
    this._unshowDeleteButton()

    return this._cardElement;
  }

  //Change like/deslike
  handleLikeClick = () => {
    this._elementLike.classList.toggle('element__like_active');
  }
  //Card deletion
  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  //Elements listeners
  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {this._handleLikesOnServer(this)});
    this._trashButton.addEventListener('click', () => {this._handleDeleteCard(this)});
    this._cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
  }
  //Delete trash button on my cards
  _unshowDeleteButton() {
    if (this._userId !== this._ownerCardID) {
      this._trashButton.remove();
    }
  }

  //Likes server
  setCount(data) {
    this._likes = data
    this._likeCount.textContent = this._likes.length;
  }

  isLiked() {
    const status = this._likes.map((userData) => userData._id).includes(this._userId);
    return status
  }

  _checkMyLike() {
    this.isLiked() ? this.addLikeClass() : this.removeLikeClass();
  }

  addLikeClass() {
    this._elementLike.classList.add('element__like_active');
  }
  removeLikeClass() {
    this._elementLike.classList.remove('element__like_active');
  }



}


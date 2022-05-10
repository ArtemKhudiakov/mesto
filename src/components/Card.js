import { api } from '../pages/index';

export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeleteCard, userId) {
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
    this.setCount(this._likes);
    this._unshowDeleteButton()
    this._setEventListeners();

    return this._cardElement;
  }

  // Сделать лайк
  _handleLikeClick = () => {
    this._elementLike.classList.toggle('element__like_active');
    // api.likeCard(this._id)
    //     // .then(data => data.json)
    //     .then(data => console.log(data.json))

  }
  // Удалить карточку
  deleteCard = () => {

    this._cardElement.remove();
    this._cardElement = null;
  };

  //Повесить слушателей
  _setEventListeners() {
    this._elementLike.addEventListener('click', this._handleLikeClick);
    this._trashButton.addEventListener('click', () => {this._handleDeleteCard(this);

  });
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
    this._likeCount.textContent = data.length;
  }

  _unshowDeleteButton() {
    if (this._userId !== this._ownerCardID) {
      this._trashButton.remove();
    }
  }



}


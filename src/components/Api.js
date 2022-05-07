export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getUserInfo() {

  }

  getInitialCards() {
    return fetch(this.url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkOk)
  }

  editUserInfo() {

  }

  addNewCard() {

  }

  deleteCard() {

  }

  likeCerd() {

  }

  dislikeCard() {

  }

  setUserAvatar() {

  }

  checkOk() {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }


}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '6a3dc8fc-cbc8-4cee-b5dd-4c0b0fbbc466',
    'Content-Type': 'application/json'
  }
});

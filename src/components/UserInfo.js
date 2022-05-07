
export class UserInfo {
constructor({nameSelector, infoSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._userAvatar = document.querySelector(avatarSelector);

  }

  getUserInfo() {
    return {
            name: this._name.textContent,
            info: this._info.textContent
            }
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._info.textContent = userData.about;
  }

  getUserAvatar() {
    return this._userAvatar.src
  }
  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }

}


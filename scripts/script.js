const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit')
const closeButton = document.querySelector('.popup__close-button')


function openEdit() {
  // evt.preventDefault();
  popup.classList.add('popup__opened');
}





function closeEdit() {
  popup.classList.remove('popup__opened');
}


editButton.addEventListener('click', openEdit);

closeButton.addEventListener('click', closeEdit);


// console.log(closeButton.classList);




// console.log(popup.classList);


let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit')
let closeButton = document.querySelector('.popup__close-button')


function openEdit () {
  popup.classList.add('popup__opened');
}





function closeEdit () {
  popup.classList.remove('popup__opened');
  console.log('2 ' + popup.classList)
}


editButton.addEventListener('click', openEdit);

closeButton.addEventListener('click', closeEdit);


console.log(closeButton.classList);




// console.log(popup.classList);


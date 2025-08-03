const toggleBUtton = document.querySelector(".nav__button")
const nav = document.querySelector('.nav')
toggleBUtton.addEventListener('click',handleClick)


function handleClick(){
    nav.classList.toggle('active')
    
}
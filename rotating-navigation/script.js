const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close")
const container = document.querySelector('.container')

openBtn.addEventListener('click' , addShoNavClass)
closeBtn.addEventListener('click' , removeShoNavClass)
 

function addShoNavClass(){
    container.classList.add('show-nav')

}

function removeShoNavClass(){
    container.classList.remove('show-nav')

}
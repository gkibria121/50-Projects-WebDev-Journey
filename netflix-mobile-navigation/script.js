const showButton = document.querySelector('#btn-show')
const hideButton = document.querySelector('#btn-hide') 
const nav = document.querySelector('.nav')
 


showButton.addEventListener('click',()=>{
  nav.classList.remove('hide')
})
hideButton.addEventListener('click',()=>{
  nav.classList.add('hide')
 
  
})
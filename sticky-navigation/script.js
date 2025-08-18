const navContainerEl = document.querySelector('.nav-container')
const navEl = document.querySelector('.nav')

 


window.addEventListener('scroll', (event)=>{
     
    if(window.scrollY > navEl.offsetHeight){
      return navContainerEl.classList.add('active')
    }
    return navContainerEl.classList.remove('active')
    
})
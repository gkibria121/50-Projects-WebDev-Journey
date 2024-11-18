 
const images = document.querySelectorAll('.content');


const buttons = document.querySelectorAll('.nav-link')


buttons.forEach((button,idx)=>{

    button.addEventListener('click',()=>{
        document.querySelectorAll('.active').forEach(el=>el.classList.remove('active'))
        document.querySelectorAll('.show').forEach(el=>el.classList.remove('show'))
        button.classList.add('active')
        images[idx].classList.add('show') 
        
    })
})
   
 

 
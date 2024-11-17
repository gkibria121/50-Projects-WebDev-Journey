 
const images = document.querySelectorAll('.image');


const buttons = document.querySelectorAll('button')


buttons.forEach((button,idx)=>{

    button.addEventListener('click',()=>{
        document.querySelectorAll('.active').forEach(el=>el.classList.remove('active'))
        button.classList.add('active')
        images[idx].classList.add('active') 
        
    })
})
   
 

 
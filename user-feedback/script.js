const emojis = document.querySelectorAll('.emoji-container')
const reviewButton = document.querySelector('.btn')
const container = document.querySelector('.container')
const reviewEl = document.querySelector('#review')
const reveiw = document.getElementById('reveiw')
const ratings = document.querySelector('.ratings')
 


ratings.addEventListener('click',handleClick)
 
reviewButton.addEventListener('click',()=>{

    container.classList.add('hide')
  

})
function handleClick(event){
    
    const target = event.target;
  
    
    if(target.parentNode.classList.contains('emoji-container')){ 
        return 
    } 
    document.querySelectorAll('.active').forEach(el=>el.classList.remove('active'))
    target.parentNode.classList.add('active')
    reveiw.innerText =  target.parentNode.querySelector('.emoji-name').innerText

}
const emojis = document.querySelectorAll('.emoji-container')
const reviewButton = document.querySelector('.btn')
const container = document.querySelector('.container')
const reviewEl = document.querySelector('#review')
const reveiw = document.getElementById('reveiw')
emojis.forEach(emoji=>
    emoji.addEventListener('click',handleClick)
)
reviewButton.addEventListener('click',()=>{
    container.classList.add('hide')
  

})
function handleClick(event){
    document.querySelectorAll('.active').forEach(el=>el.classList.remove('active'))
    this.classList.add('active')
    reveiw.innerText =  this.querySelector('.emoji-name').innerText

}
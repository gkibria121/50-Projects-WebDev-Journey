const cardImage = document.querySelector('.card .card-image')
const heartCountEl = document.getElementById("heart-count")
let times = 0;


cardImage.addEventListener('dblclick',(event)=>{
 
    const x = event.offsetX;
    const y = event.offsetY; 
    console.log(event);
    
    const heartEl = createHeart();
    heartEl.style.top = `${y}px`;
    heartEl.style.left = `${x}px`;
    cardImage.appendChild(heartEl);
    
    heartCountEl.innerText = ++times;
    setTimeout(()=>{
        heartEl.remove(); 
    },1500)
    
})
 


function createHeart(){
    const heartEl = document.createElement('span')
    heartEl.classList.add('icon');
    heartEl.classList.add('icon--heart');
    heartEl.classList.add('animate'); 
    return heartEl;
}

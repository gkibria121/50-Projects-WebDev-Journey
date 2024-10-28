const cardImage = document.querySelector('.card .card-image')
const heartCountEl = document.getElementById("heart-count")
let times = 0;


cardImage.addEventListener('dblclick',(event)=>{
 
    const x = event.offsetX;
    const y = event.offsetY; 
    const heartEl = createHeart(x,y);
    cardImage.appendChild(heartEl); 
    heartCountEl.innerText = ++times;
    setTimeout(()=>{
        heartEl.remove(); 
    },1000)
    
})
 


function createHeart(x,y){
    const heartEl = document.createElement('span')
    heartEl.classList.add('icon');
    heartEl.classList.add('icon--heart');
    heartEl.classList.add('animate'); 
    heartEl.style.left = `${x}px`;
    heartEl.style.top = `${y}px`;
    return heartEl;
}

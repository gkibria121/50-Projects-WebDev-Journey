const heroTextEl = document.querySelector('.hero-text')
const speedControlEl = document.querySelector('input[type="number"]')
const heroText = "We Love Programming!";

let speed = 100; 
let idx = 1;


 
speedControlEl.addEventListener('input',handleSpeedChange)
 
writeText()

function writeText(){
    heroTextEl.innerText = heroText.slice(0,idx) 
    if(idx<heroText.length ){
        idx++
        
    }
    else{
        idx =1;
    }
    setTimeout(writeText,speed)
}

 
function handleSpeedChange(event){

    
    speed = 100/event.target.value;
    
}
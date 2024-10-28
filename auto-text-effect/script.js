const heroTextEl = document.querySelector('.hero-text')
const speedControlEl = document.querySelector('input[type="number"]')
const heroText = "We Love Programming!";

let speed = 100; 




animateText(heroTextEl,heroText)


speedControlEl.addEventListener('change',handleSpeedChange)
 

function animateText(elment, text){
    heroTextEl.innerText = "";
    let textArr = text.split("");

    for (let i in textArr){ 
        setTimeout(()=>{
            const span = document.createElement('span')
            span.innerText = textArr[i]; 
            elment.appendChild(span); 
        },speed*i) 

    }
    
}

function handleSpeedChange(event){

    
    speed = 100/event.target.value;
    animateText(heroTextEl,heroText)

}
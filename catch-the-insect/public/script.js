const screens = document.querySelectorAll('.screen')
const startButton = document.querySelector('#play')
const selectInsect = document.querySelector('#select')
const gameScreen = document.querySelector('#game-screen')
const insectButtons = document.querySelectorAll('.insect') 
const timeEL = document.querySelector('#time')
const scoreEl = document.querySelector('#score') 
const gameWarning = document.querySelector('.warning-box')
let interval;
const MULTIPLIER = 2; 
startButton.addEventListener('click',(event)=>{

    removeActive()
    selectInsect.classList.add('active')
})
insectButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        removeActive()
        removeSelection()
        btn.classList.add('selected')
        gameScreen.classList.add('active')
        startTimer()
        setTimeout(()=>{
            createInsect();
        },1000)
        
    })
})

 
function removeActive(){
    document.querySelectorAll('.active').forEach(e=> e.classList.remove('active'))
}
function removeSelection(){
    document.querySelectorAll('.selected').forEach(e=> e.classList.remove('selected'))
}


function startTimer() {
    const outputElement = document.getElementById("time");
 
    const start = new Date();
    function calculateElapsedTime() {
 
        const now = new Date();
        

        // Ensure the start time is valid
        if (isNaN(start)) {
            outputElement.innerText = "Invalid start time.";
            return;
        }

        // Calculate the time difference
        let diff = now - start;

        if (diff < 0) {
            outputElement.innerText = "Timer hasn't started yet.";
            return;
        }

        // Convert to days, hours, minutes, seconds
    
        diff %= 1000 * 60 * 60;
        const minutes = Math.floor(diff / (1000 * 60));
        diff %= 1000 * 60;
        const seconds = Math.floor(diff / 1000);
 
         // Format with leading zeros
         const formattedMinutes = String(minutes).padStart(2, "0");
         const formattedSeconds = String(seconds).padStart(2, "0");
 
         // Display the result
         outputElement.innerText = `${formattedMinutes}:${formattedSeconds}`;
    }

    // Start the timer and update every second
    calculateElapsedTime();
    setInterval(calculateElapsedTime, 1000);
}




function createInsect(){
    const selectedInsect = document.querySelector('.selected')
    const insectImgSrc = selectedInsect.querySelector('img').src;

    const insectToAdd = createInsectEl(insectImgSrc) 
    gameScreen.appendChild(insectToAdd)
    
 }


 function createInsectEl(src){
    const img = document.createElement('img')
    img.src = src;
    img.classList.add('click-me');
    img.style.setProperty("--rotation", `rotate(${Math.floor(Math.random() * 360)}deg)`); // On hover
    img.style.top = `${Math.random()*90}%`
    img.style.left = `${Math.random()*90}%` 

    img.addEventListener('click',()=>{
        img.classList.remove('click-me')
        img.classList.add('hide')
        addScore()
        setTimeout(()=>{
            img.remove()
            multiplyInsect(img.src )
        },500)
       
    })
    
    img.classList.add('insect-img')
    return img
 }

 function multiplyInsect(src ){

    for (let index = 0; index < MULTIPLIER; index++) {
        const insectToAdd = createInsectEl(src) 
        gameScreen.appendChild(insectToAdd)
        
    }
   

 }

 function addScore(){
    let score = parseInt(scoreEl.innerText) + 1
    scoreEl.innerText  = score ;
    if(score==20){
        gameWarning.classList.remove('hidden')
    }
    if(score>20 && score<25 ){
        gameWarning.classList.add('hidden')
    }
 }
const imageContainer = document.querySelector('.image-container')
const images  = document.querySelectorAll('img')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
let currentImage = 0;
let interval;

updateDom()
createInterval()

prev.addEventListener('click',()=>{
    clearInterval(
        interval
    )
    currentImage--
    if(currentImage<0){
        currentImage = images.length-1
    }     
    updateDom()
    createInterval()
})
next.addEventListener('click',()=>{
    currentImage++
    clearInterval(
        interval
    )
    if(currentImage==images.length-1){
        currentImage=0;
    }
    updateDom()
    createInterval()
})

function updateDom(){  
    imageContainer.style.transform = `translateX(-${currentImage*100}%) ` 
    
}

function createInterval(){
    interval = setInterval(()=>{
        currentImage++
        if(currentImage==images.length-1){
            currentImage=0;
        }
        updateDom()
    },3000)
 

}


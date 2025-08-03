const imageContainer = document.querySelector('.image-container')
const images  = document.querySelectorAll('img')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
let currentImage = 0;
let interval =  setInterval(()=>{
    currentImage++
    if(currentImage==images.length-1){
        currentImage=0;
    }
    updateDom()
},3000)

updateDom()


prev.addEventListener('click',()=>{
 
    currentImage--
      
    updateDom()
    resetInterval()
})
next.addEventListener('click',()=>{
    currentImage++
   
    if(currentImage==images.length-1){
        currentImage=0;
    }
    updateDom()
    resetInterval()
})

function updateDom(){  
    if(currentImage==images.length-1){
        currentImage=0;
    }
    else if(currentImage<0){
        currentImage=images.length-1
    }
    imageContainer.style.transform = `translateX(-${currentImage*100}%) ` 
    
}

function resetInterval(){
    clearInterval(interval)
    interval = setInterval(run ,2000)
  
}

function run (){
    currentImage++
    updateDom()
}
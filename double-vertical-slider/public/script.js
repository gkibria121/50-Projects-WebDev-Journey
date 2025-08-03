const sliderContainer = document.querySelector('.slider-container')
const leftSlider = document.querySelector('.left-slider')
const rightSlider = document.querySelector('.right-slider')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const slidesLength = leftSlider.querySelectorAll('div').length
let activeSlide = 0;
leftSlider.style.top = `-${(slidesLength -1)*100}vh`;  

upButton.addEventListener('click',()=>changeSlider('up'))
downButton.addEventListener('click',()=>changeSlider('down'))

const changeSlider = (direction)=>{
    
    if(direction==="up"){
        activeSlide++
        if(activeSlide > slidesLength-1){
            activeSlide = 0;
       }
    }
    if(direction==="down"){
        activeSlide--
        if(activeSlide < 0){
            activeSlide = slidesLength-1;
       }
    }
 
    leftSlider.style.top = `-${(slidesLength-activeSlide-1)*100}vh`;  
    rightSlider.style.top = `-${activeSlide*100}vh`;  
    
}
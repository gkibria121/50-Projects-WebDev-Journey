const sliders = document.querySelectorAll(".slider");
const sliderContainer = document.querySelector(".slider-container");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

let activeSlide = 0;

leftArrow.addEventListener("click", handleLeftArrow);
rightArrow.addEventListener("click", handleRightArrow); 

setBody();

function setBody() {
  sliderContainer.style.backgroundImage = sliders[activeSlide].style.backgroundImage;
  removeClasses();
  sliders[activeSlide].classList.add('active') 
  
}

function handleLeftArrow() {
  if (activeSlide == 0) {
    activeSlide = sliders.length;
  }
  activeSlide--   
  setBody(); 
}
function handleRightArrow() {
    if (activeSlide == sliders.length-1) {
      activeSlide = -1; 
    }
    activeSlide++   
    setBody(); 
  }

function removeClasses (){
    sliders.forEach((slider)=>{
        slider.classList.remove('active')
    })
}
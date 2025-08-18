const boxContainer = document.querySelector('.boxes')


const BOX_COUNT = 16;


const magicButton = document.querySelector('.magic')

const root = 4;

for (let y = 0; y <root; y++) {


    for(let x = 0 ; x < root; x++){
    const element =  createBox(x,y)
    boxContainer.appendChild(element)
    }
    
} 
function createBox(x,y){

    const box = document.createElement('div')
    box.classList.add('box')
    box.style.backgroundPosition = `${-x*125}px ${-y*125}px`;
    return box
}

 
magicButton.addEventListener('click',()=>{
    boxContainer.classList.toggle('big')
})
const container = document.querySelector('.container')
const BOX = 500;

const colors = [
    'rgba(255, 107, 107, 1)',   // coral red
    'rgba(78, 205, 196, 1)',    // turquoise
    'rgba(255, 184, 76, 1)',    // golden yellow
    'rgba(132, 94, 194, 1)',    // purple
    'rgba(0, 184, 169, 1)',     // teal
    'rgba(248, 243, 212, 1)',   // cream
    'rgba(44, 115, 210, 1)',    // blue
    'rgba(255, 150, 113, 1)',   // salmon
    'rgba(54, 174, 124, 1)',    // green
    'rgba(232, 69, 69, 1)'      // bright red
];

for (let i = 0; i < BOX; i++) {
    const boxEl = createBox()
    container.appendChild(boxEl)
    
}

function createBox(){
    const box = document.createElement('div')
    box.classList.add('box')
    box.addEventListener('mouseover',()=>{
        setColor(box)
    })
    box.addEventListener('mouseout',()=>{
        removeColor(box)
    })
    return box
}


function getRandomColor(){
    return colors[Math.floor(Math.random()*colors.length-1)]
}

function setColor(box){
    const color =  getRandomColor() 
        box.style.backgroundColor = color  
        box.style.boxShadow = ` 0px 0px 10px ${color}, 0px 0px 2px ${color}  `

}
function removeColor(box){
    box.style.backgroundColor = '#1d1d1d'  
    box.style.boxShadow = ` 0px 0px 2px #000`
}
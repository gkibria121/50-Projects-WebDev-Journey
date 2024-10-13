const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
const sizeEl = document.getElementById("size")
const colorInput = document.getElementById("color")
const increaseBtn  = document.getElementById("increase") 
const decreaseBtn  = document.getElementById("decrease") 
const clearBtn = document.getElementById("clear")
let size = 20;
let color = "black"
let isPressed = false;
const point = { x : undefined , y : undefined} 


canvas.addEventListener('mousedown',(event)=>{ 
    point.x = event.offsetX;
    point.y = event.offsetY;
    isPressed = true;
    drawCircle(point.x,point.y)
}) 
canvas.addEventListener('mousemove',(event)=>{
    if(!isPressed){
        return;
    }
    let x2 = event.offsetX;
    let y2 = event.offsetY;
    
    drawCircle(point.x,point.y)
    drawLine(point.x,point.y, x2,y2) 
    updatePoint(event) 
}) 
canvas.addEventListener('mouseup',(event)=>{ 
    isPressed = false;
    point.x = undefined;
    point.y = undefined;
    
})

increaseBtn.addEventListener('click', ()=>{
    size++
    updateSize()

})
decreaseBtn.addEventListener('click', ()=>{
    size--
    if(size<1){
        size = 1
    }
    updateSize()

})

clearBtn.addEventListener('click',()=>{
  ctx.putImageData(ctx.createImageData(800,400),0,0)
})

updateSize()
updateColor()


function drawCircle(x,y){
    ctx.beginPath()
    ctx.arc(x,y,size,0, 2*Math.PI );
    ctx.fillStyle = color;
    ctx.fill();
}


function drawLine(x1,y1,x2,y2){
    ctx.beginPath()
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2)
    ctx.strokeStyle = color; 
    ctx.lineWidth = size*2;
    ctx.stroke()
}

function updatePoint(event){
    point.x = event.offsetX;
    point.y = event.offsetY;
}


function updateSize(){
    sizeEl.innerText = size
}
function updateColor(){
    color = colorInput.value;
}

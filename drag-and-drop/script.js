const fill  = document.querySelector('.fill')
const empties = document.querySelectorAll('.empty')


fill.addEventListener('dragstart',dragStart)
fill.addEventListener('dragend',dragEnd)


empties.forEach((empty)=>{
    empty.addEventListener('dragover',dragOver);
    empty.addEventListener('dragenter',dragEnter);
    empty.addEventListener('dragleave',dragLeave);
    empty.addEventListener('drop',dragDrop);
})


function dragStart(){
    this.className = "fill hold";
    setTimeout(() => this.classList.add('invisible'), 0);
    
}

function dragEnd(){
    this.className ="fill"
}

function dragOver(e){
    e.preventDefault();
    
    
}
function dragEnter(e){
    e.preventDefault(); // Necessary to allow dragOver to work
    this.className ="empty hovered"
    
}
function dragLeave(){
     this.className  ="empty"
    
}
function dragDrop(){
    this.className = 'empty';
    this.append(fill)
    
}
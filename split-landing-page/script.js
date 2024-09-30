const leftSide = document.querySelector('.left')
const rightSide = document.querySelector('.right')



leftSide.addEventListener('mouseover', addHoverEffect)
rightSide.addEventListener('mouseover', addHoverEffect)


function addHoverEffect(event){
    const target = event.target;
    if(target==leftSide || leftSide.contains(target)){
        leftSide.classList.add('flex-grow')
        rightSide.classList.remove('flex-grow')
        return;
    }
    rightSide.classList.add('flex-grow')
    leftSide.classList.remove('flex-grow')

    
}


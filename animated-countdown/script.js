const nums = document.querySelectorAll('.nums span')
const counter = document.querySelector('.counter')
const final = document.querySelector('.final')
const replay = document.querySelector('.replay')




animate()

replay.addEventListener('click',()=>{
    resetDom()
    animate()
})

function animate(){
    nums.forEach((num,index)=>{
        const endIdx = nums.length-1;
        num.addEventListener('animationend',(e)=>{
             if(e.animationName ==="goIn" && index !==endIdx){
                num.classList.value ="";
                num.classList.add('out')
             } 
             else if(e.animationName ==="goOut" && index !==endIdx){
                num.classList.value ="";
                num.nextElementSibling.classList.add('in')
             } 
             else{
                counter.classList.add('hide')
                final.classList.add('show')
             }

        })
        
    })
}


function resetDom(){
    counter.classList.remove('hide')
    final.classList.remove('show')
    nums.forEach((num)=>{
        num.classList.value =''
    })
    nums[0].classList.add('in')
}
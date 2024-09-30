const container = document.querySelector('.container')

const jokeBtn = document.getElementById('jokeBtn')
const jokeEl = document.getElementById('joke')

let height = window.innerHeight;
let width = window.innerWidth;
let midY = height/2;
let midX = width/2


 getJoke()
 jokeBtn.addEventListener('click',getJoke)

document.addEventListener('mousemove',(event)=>{
    if(event.target==container||container.contains(event.target)){
        container.style.boxShadow =`none`;
        return
    }
    let x = event.pageX;
    let y = event.pageY; 

    container.style.boxShadow =`${scale(x,0,width,2,-2)}rem ${scale(y,0,height,2,-2)}rem rgba(0, 0, 0, .5)`;
    
})

 
function scale(load,in_min,in_max,out_min,out_max){
    return (((load-in_min)*(out_max-out_min))/(in_max-in_min))+out_min;
}


async function  getJoke(){

    const resp = await fetch('https://icanhazdadjoke.com/',{
        headers : {
            "Accept" : "application/json"
        }
    })
    const data =  await resp .json();
    jokeEl.innerHTML = data.joke;
}
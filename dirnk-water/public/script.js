const remained = document.getElementById("remained")
const largeGlass = document.querySelector('.glass--large')
const perc = document.getElementById("per")
const glasses = document.querySelectorAll('.glasses .glass') 
const remainedTextContainer  = document.querySelector('.remained__text-container')

glasses.forEach((gls,inx) =>{
gls.addEventListener('click', ()=>{
    removeWater()
    addWater(inx)
    let percentage = getRemainingWaterPercentage(inx);
    updateRemaining(percentage)
})


})


 
function removeWater(){
    glasses.forEach((gls)=>{
        gls.classList.remove('drank')
    })
}

function addWater(inx){
    for (gls in glasses ) {  
        let elGlase = glasses[gls];
        elGlase.classList.add('drank')
        if(gls==inx){
            elGlase.classList.add('drank')
            break;
        }        
    }
     
}

function getRemainingWaterPercentage(inx){
    return ((inx+1)/glasses.length)*100;
}

function updateRemaining(percentage){
    perc.innerText = `${percentage}%`; 
    perc.style.height = `${percentage}%`;  
    remained.innerText = `${ 2 - (percentage/100)*2 }L`; 

}
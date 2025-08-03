 const range = document.querySelector('#range')
const rangeLabel = document.querySelector('label[for="range"]')


 range.addEventListener('input',handleChange)


 function handleChange (event) {
    
    const max = event.target.max
    const min = event.target.min
    const value = event.target.value; 
    const left = scale(value, min,max,0,100)
    
    rangeLabel.innerText = event.target.value
    rangeLabel.style.left = `${left}%`


    
 }

 function scale(value,in_min,in_max,out_min,out_max){
    return ((value-in_min)*(out_min-out_max))/(in_min-in_max)+out_min  

 }
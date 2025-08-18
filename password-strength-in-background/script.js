const bgImg = document.querySelector('.bg-image')

const passowrdEl = document.querySelector('input[type="password"]')



passowrdEl.addEventListener('input', (event)=>{
    
    const target = event.target;

    const value = target.value;

    const valLen = value.length

    const blur = scale(valLen, 0,8,10,0 )
 
 
    bgImg.style.filter = `blur(${blur}px)`
    
    
  

    
})



function scale(value,in_min,in_max,out_min,out_max){
   
    return ( ((value-in_min  )*(out_max-out_min)) /in_max-in_min) + out_min
}



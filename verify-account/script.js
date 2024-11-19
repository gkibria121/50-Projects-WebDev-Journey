const inputes = document.querySelectorAll(".input"); 

 
inputes.forEach((input, idx) => {
  input.addEventListener("keydown", (event) => {handleInput(event, idx) ;  }); 
});

 
function handleInput(event,idx){
     
    if(event.key > 0 && event.key <=9){  
        inputes[idx].value = ''
        setTimeout(()=>inputes[idx+1]?.focus(),10)
    }
    else if(event.key =='Backspace'){
        setTimeout(()=>inputes[idx-1]?.focus(),10)
    }
    
    
}
 

 
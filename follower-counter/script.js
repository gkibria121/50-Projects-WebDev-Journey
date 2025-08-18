const counters = document.querySelectorAll('.counter')

updateCounters()

function updateCounters(){

    counters.forEach(counter=>{
        const target =    +counter.getAttribute('data-target');
        counter.innerText = '0'; 
        updateCounter(counter,target)

    })

    function updateCounter(counter,target){
        const times = Math.ceil(target/200) ;
        const count = +counter.innerText; 

       if(count<target){
        counter.innerText = times + count;
        setTimeout(()=>{
            updateCounter(counter,target)
        },10)  
        return;
       }
       counter.innerText = target;
         
        
    }

}
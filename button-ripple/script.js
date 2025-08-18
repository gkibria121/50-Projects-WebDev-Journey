const rippleBtns = document.querySelectorAll('.btn.btn-ripple');


rippleBtns.forEach(btn => { btn.addEventListener('click',rippleEffect)})


function rippleEffect(event) {
     
     
    const rect = this.getBoundingClientRect();  
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const spanEl = document.createElement("span");
    spanEl.style.top = `${y}px`;
    spanEl.style.left = `${x}px`;

    this.appendChild(spanEl)

    setTimeout(()=>{
        spanEl.remove();
    },1000)
    
    
    
}
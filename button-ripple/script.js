const rippleBtns = document.querySelectorAll('.btn.btn-ripple');


rippleBtns.forEach(btn => { btn.addEventListener('click',rippleEffect)})


function rippleEffect(event) {
    
    const el = event.target;
    if(!el.tagName=="BUTTON"){
        el = event.closest('.btn.btn-ripple');
    }
    const rect = el.getBoundingClientRect(); 
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const spanEl = document.createElement("span");
    spanEl.style.top = `${y}px`;
    spanEl.style.left = `${x}px`;

    el.appendChild(spanEl)

    setTimeout(()=>{
        spanEl.remove();
    },1000)
    
    
    
}
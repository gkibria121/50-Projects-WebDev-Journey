const keyCode = document.getElementById("keyCode")
const keyInfoContainer  = document.getElementById("insert")


window.addEventListener('keydown',handleKeyDonw)


function handleKeyDonw(event){
    keyCode.innerHTML = event.keyCode;
    keyCode.classList.remove('heading--small')
    keyCode.classList.add('heading')
    keyInfoContainer.innerHTML =   `
            <div class="key">
                <div class="key__heading">event.key</div>
                <div class="key__value">${event.key}</div>
            </div>
            <div class="key">
                <div class="key__heading">event.location</div>
                <div class="key__value">${event.location}</div>
            </div>
            <div class="key">
                <div class="key__heading">event.keyCode</div>
                <div class="key__value">${event.keyCode}</div>
            </div>
            <div class="key">
                <div class="key__heading">event.code</div>
                <div class="key__value">${event.code}</div>
            </div>
    `
    console.log(event);
    
}
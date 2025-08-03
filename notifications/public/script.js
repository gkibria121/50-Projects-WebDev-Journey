const btn  = document.querySelector(".btn")
const toastContainer = document.querySelector('.toasts')
const messages = ["Message One","Payment successfull!", "Attention","Message Two"];
const types = ["info","warning","alert","success"]
btn.addEventListener('click',()=>{
    createNotification()
})



function createNotification(message=null,type=null){
    const randomMsg = getRandomItem(messages);
    const randomType = getRandomItem(types); 
     const notif = document.createElement('div');
     notif.innerText=message??randomMsg;
     notif.classList.add(type??randomType);
     notif.classList.add('toast');
    toastContainer.appendChild(notif);
    sendNotification(randomMsg,randomType)
    setTimeout(()=>{
        notif.classList.add('fade-out');
        notif.addEventListener('transitionend', () => {
            notif.remove();  
          });
    },3000)
    
 
}


function getRandomItem(arr){
    return arr[Math.floor(Math.random()* arr.length )]
}


function sendNotification(message=null,type=null,icon =null){
    if (!"Notification" in window) {
        console.log("Notifications are not supported by this browser.");
        return;
    } 
     Notification.requestPermission().then(permission => {
       if(permission !== "granted"){
        console.log("Notification permission denied");
        return;
       }
       
       const notification = new Notification(type??"Hello!", {
        body:message,
        icon: icon??"https://example.com/icon.png" // Optional icon
      });
  
      // Handle click event
      notification.onclick = () => {
        window.focus(); // Bring the tab into focus
        console.log("Notification clicked");
      };
     
    });

}
 





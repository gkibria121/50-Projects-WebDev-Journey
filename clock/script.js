const toggleBtn = document.querySelector('#toggole')
const niddleSecond = document.querySelector('.niddle.second')
const niddleMinute = document.querySelector('.niddle.minute')
const niddleHour = document.querySelector('.niddle.hour')
const timeEl = document.querySelector('.time')
const dateMonthEl = document.querySelector('.day-month-date')
let s = 0;
let m = 0;
let h = 0;
toggleBtn.addEventListener('click',()=>{ document.querySelector('html').classList.toggle('dark') })
setInterval(updateTime,1000)

function updateTime(){
    const dateTime = new Date();
    const seconds = dateTime.getSeconds();
    const minutes = dateTime.getMinutes();
    const hours = dateTime.getHours();
    const day = dateTime.getDay();
    const date = dateTime.getDate();
    const month = dateTime.getMonth(); 
    updateCounter(seconds,minutes,hours);
    niddleSecond.style.transform = ` translate(-50%,-100%) rotate(${scale(seconds,0,59,0+(s*360),360+(s*360))}deg)`;
    niddleMinute.style.transform = ` translate(-50%,-100%) rotate(${scale(minutes,0,59,0+(m*360),360+(m*360))}deg)`;
    niddleHour.style.transform = ` translate(-50%,-100%) rotate(${scale(hours%12,0,11,0+(h*360),360+(h*360))}deg)`;
    timeEl.innerHTML = `${hours%12}:${minutes<10 ?`0${minutes}`:`${minutes}`} ${hours>12?"PM" : "AM"}`;
    dateMonthEl.innerHTML = `${getDay(day)}, ${getMonth(month)} <span class="date">${date}</span>`;
}

function updateCounter(seconds,minutes,hours){
    if (seconds==0) {
        s++
    }
    else return;
    if(minutes==0){
        m++
    }else return;
    if(hours%12==0){
        h++
    }else return;

}

function getDay(day){
    const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    ;
    return dayList[day];
}
function getMonth(month){
    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return monthList[month];
}

function scale(load,in_min,in_max,out_min,out_max){
    return (((load-in_min)*(out_min-out_max))/(in_min-in_max))+out_min;
}
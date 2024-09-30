const audios = ['24', 'chimes','dice','random','rapidsclose'];
const audioContainer = document.getElementById("audios")
const buttonContainer = document.getElementById("buttons") 


addAudios()



 function addAudios(){
    audios.forEach(audio=>{
        let audioPlayer = addAudioTag(audioContainer,audio)
        audioPlayer.addEventListener('ended',resetAudioPlayer)
        let button = addControlButton(buttonContainer, audio)
        button.addEventListener('click',handleClick)

    })
 }

 function handleClick(event){

    event.stopPropagation()
    const target =  event.target;
    if(target.tagName!='BUTTON'){
        target.parentElement.click()
        return;
    }
    let audioPlayer = document.getElementById(target.getAttribute("name")) 
    let duration = audioPlayer.duration; 
    target.style.transitionDuration = duration;
    stopMusic()
    handleActiveClass(target)
    audioPlayer.play() 
 
 }

 function stopMusic(){
    let audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause()
        audio.currentTime = 0;
    })
 }

 function addAudioTag(container,name){
    const audioTag = document.createElement('audio')
    audioTag.src = `./audio/${name}.mp3`
    audioTag.setAttribute("id",name)
    container.appendChild(audioTag)
    return audioTag
 }

 function addControlButton(container,name){
    const button = document.createElement('button')
    button.classList.add('btn')
    button.setAttribute('name', name)
    button.innerHTML=`<i class="fas fa-play"> </i><i class="fa fa-pause"></i> ${name}`;
    container.appendChild(button)
    return button;
 }

 function handleActiveClass(button)
 {
    
    removeActiveClasses()
    button.classList.add('active')
    
    
 }
 function resetAudioPlayer(){
    removeActiveClasses()
 }

 function removeActiveClasses(){
    let activeButtons = document.querySelectorAll('.active')
    activeButtons.forEach((btn)=>{
        btn.classList.remove('active')
    })
 }
 
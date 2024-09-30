const questions = document.querySelectorAll('.faq__question')
const toggleButtons = document.querySelectorAll('.faq__question-button');


toggleButtons.forEach( toggleButton=> {
toggleButton.addEventListener('click',toggleAnswer)
})

function toggleAnswer(event){

    const question = event.target.closest('.faq__question')
    removeActiveClass(question)
    question.classList.toggle('active')

}

function removeActiveClass(question){

    questions.forEach(qn =>{
        if(qn===question){  
           return;
        }
        qn.classList.remove('active')
    })

}
 
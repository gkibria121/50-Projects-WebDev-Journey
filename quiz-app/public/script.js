const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: { a: "Java", b: "C", c: "Python", d: "JavaScript" },
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    options: {
      a: "Central Style Sheets",
      b: "Cascading Style Sheets",
      c: "Cascading Simple Sheets",
      d: "Cars SUVs Sailboats",
    },

    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    options: {
      a: "Hypertext Markup Language",
      b: "Hypertext Markdown Language",
      c: "Hyperloop Machine Language",
      d: "Helicopters Terminals Motorboats Lamborginis",
    },

    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    options: { a: "1996", b: "1995", c: "1994", d: "none of the above" },
    correct: "b",
  },
];

const content = document.querySelector(".content");

const quizConainer = document.querySelector(".quiz-container");

const quizForm = document.querySelector("#quiz-form");

let currentQuiz = 0;
let score = 0;

loadQuiz();

quizForm.addEventListener("submit", handleSubmit);

function loadQuiz() {
  const quiz = quizData[currentQuiz];
  quizConainer.innerHTML = `<h3 class="quiz" for="quiz">${quiz.question}</h3>`;

  for (option in quiz.options) {
    const ansBox = createAnsBox(option, quiz.options[option]);
    quizConainer.appendChild(ansBox);
  }
}

function createAnsBox(option, label) {
  const ansBox = document.createElement("div");
  ansBox.classList.add("ans-box");
  ansBox.innerHTML = `
    <input type="radio" name="quiz" id="${option}" />
    <label for="${option}">${label}</label>
    `;
  return ansBox;
}

function handleSubmit(event) {
  event.preventDefault();
  const chosie = event.target.querySelector('input[type="radio"]:checked');
  if (!chosie) {
    alert("Please choose an option!");
    return;
  }

  const currectAns = quizData[currentQuiz].correct;

  if (chosie.id == currectAns) {
    score++;
  }

  currentQuiz++;

  if (currentQuiz <  quizData.length) {
    loadQuiz();
    return;
  }

  quizForm.innerHTML = `
  <div class="quiz-container">
        <h3 class="quiz" for="quiz">Your score is ${score}/${quizData.length}</h3>
         
        </div>
      </div>

      <button class="btn" type="button" onClick="location.reload()">Reload</button>`;
}

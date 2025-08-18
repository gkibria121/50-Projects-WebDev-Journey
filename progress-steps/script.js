// DOM Elements
const progressBar = document.querySelector('.progress-bar');
const circles = document.querySelectorAll('.circle');
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

// State
let currentStep = 1;
const totalSteps = circles.length;

// Event Listeners
nextButton.addEventListener('click', goNext);
prevButton.addEventListener('click', goPrev);

// Navigation Functions
function goNext() {
    currentStep = Math.min(currentStep + 1, totalSteps);
    update();
}

function goPrev() {
    currentStep = Math.max(currentStep - 1, 1);
    update();
}

// Update UI
function update() {
    updateCircles();
    updateProgressBar();
    updateButtons();
}

function updateCircles() {
    circles.forEach((circle, index) => {
        circle.classList.toggle('active', index < currentStep);
    });
}

function updateProgressBar() {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateButtons() {
    prevButton.disabled = currentStep === 1;
    nextButton.disabled = currentStep === totalSteps;
}

// Initial setup
update();
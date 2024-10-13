// Get the elements for which we want to show placeholders
const cardHeader = document.querySelector('.card__header');
const cardTitle = document.querySelector('.card__title');
const cardDesc = document.querySelector('.card__desc');
const authorImg = document.querySelector('.author__img');
const authorName = document.querySelector('.author__name');
const authorPublished = document.querySelector('.author__published');

// Define the function to load actual content
function loadContent() {
    // Replace image and content for the card
    cardHeader.innerHTML = `<img src="./img/alex-knight-j4uuKnN43_M-unsplash.jpg" class="card__img" alt="Laptop">`;
    cardTitle.textContent = 'Lorem ipsum dolor sit amet.';
    cardDesc.innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!`;

    // Replace author details
    authorImg.src = "./img/jordi-espinosa-5bJBFSIB3ac-unsplash.jpg";
    authorName.textContent = 'John Doe';
    authorPublished.textContent = 'Oct 08, 2020';

    // Remove animated background classes
    removeAnimatedBg();
}

// Function to remove the placeholder classes
function removeAnimatedBg() {
    const animatedBgs = document.querySelectorAll('.animated-bg');
    const animatedBgTexts = document.querySelectorAll('.animated-bg--text');

    animatedBgs.forEach(bg => bg.classList.remove('animated-bg'));
    animatedBgTexts.forEach(bgText => bgText.classList.remove('animated-bg--text'));
}

// Simulate content loading after a delay
setTimeout(loadContent, 1500);

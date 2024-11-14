const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const formEl = document.getElementById("form");
const copyButton = document.querySelector(".fa-clipboard");
let generatedPassword = "1234";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  generatedPassword = generatePassword();
  passwordEl.value = generatedPassword;
});
copyButton.addEventListener("click", () => {
  navigator.clipboard
    .writeText(generatedPassword)
    .then(() => {
      alert("password coppied!");
    })
    .catch((e) => {
      alert("fail to copy password!");
    });
});

function generatePassword() {
  const charArray = getCharArray();
  if (!charArray.length) {
    alert("Please check password attributes!");
    throw new Error("Terminating process due to an error.");
  }
  let text = "";
  for (let i = 0; i < parseInt(lengthEl.value); i++) {
    let char = charArray[Math.floor(Math.random() * charArray.length)];
    text += char;
  }
  if (validate(text)) {  
    return text;
  }

  return generatePassword();
}

function getCharArray() {
  let arr = [];
  if (uppercaseEl.checked) {
    arr = [...arr, ...getUppercaseArray()];
  }
  if (lowercaseEl.checked) {
    arr = [...arr, ...getLowercaseArray()];
  }
  if (numbersEl.checked) {
    arr = [...arr, ...getNumbersArray()];
  }
  if (symbolsEl.checked) {
    arr = [...arr, ...getSymbolsArray()];
  }
  return arr;
}

function getUppercaseArray() {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
}
function getLowercaseArray() {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
}
function getNumbersArray() {
  return Array.from({ length: 10 }, (_, i) => 0 + i);
}
function getSymbolsArray() {
  return Array.from({ length: 14 }, (_, i) => String.fromCharCode(33 + i));
}

function validate(text) {
  if (uppercaseEl.checked) {
    if (!text.match(/[A-Z]/g)) {
      return false;
    }
  }
  if (lowercaseEl.checked) {
    if (!text.match(/[a-z]/g)) {
      return false;
    }
  }
  if (numbersEl.checked) {
    if (!text.match(/[0-9]/g)) {
      return false;
    }
  }
  if (symbolsEl.checked) {
    if (!text.match(/[^a-zA-Z0-9\s]/g)) {
      return false;
    }
  }
  return true;
}

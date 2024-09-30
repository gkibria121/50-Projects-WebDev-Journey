const textEl = document.querySelector("#textarea");
const tags = document.querySelectorAll(".tags");
const tagContainer = document.querySelector(".tags");
textEl.addEventListener("keyup", handleChanges);

function handleChanges(event) {
    const value = event.target.value; 
    const choices = getChoices(value);
    updateChoiceList(choices);
  if (event.key === "Enter") {
    event.target.value="";
    generateRandomChoice(choices);
  }
 

}

function getChoices(choiceString) {
  let choiceTexts = choiceString
    .replace("\n", "")
    .split(",")
    .filter((el) => el.trim() !== "")
    .map((el) => el.trim());

  return choiceTexts.map((choice) => {
    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.innerText = choice;
    return tag;
  });
}

function pickUpRandomChoice(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}

function generateRandomChoice(choices) {
  let times = 30;
  const interval = setInterval(() => {
    let choice = pickUpRandomChoice(choices);
    selectChoice(choice); 

    setTimeout(() => {  
      deSelectChoice(choice);
    }, 100);

 
  }, 100);
  setTimeout(()=>{
    clearInterval(interval)
    setTimeout(()=>{
        let choice = pickUpRandomChoice(choices);
        selectChoice(choice); 
    },100)
  },times*100)
}

function updateChoiceList(choices) {
  tagContainer.innerHTML = "";
  choices.forEach((element) => {
    tagContainer.appendChild(element);
  });
}

function selectChoice(choice) {
  choice.classList.add("selected");
}
function deSelectChoice(choice) {
  choice.classList.remove("selected");
}

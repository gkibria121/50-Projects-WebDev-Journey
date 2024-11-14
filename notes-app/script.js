const notesEl = document.querySelector(".notes");
const addButton = document.querySelector("#add");
const notesArray = getNotes();
updateDom();
addButton.addEventListener("click", () => {
  notesArray.push("");
  updateDom();
});

function createNoteEl(text, index) {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
          <div class="header">
            <i class="fa-solid fa-pen-to-square edit-button" data-index="${index}"></i>
            <i class="fa-regular fa-trash-can delete-button" data-index="${index}"></i>
          </div>
          <div class="body">${marked(text)}</div>
          <textarea class="body">${text}</textarea>
        `;

  note
    .querySelector(".edit-button")
    .addEventListener("click", () => handleEdit(index));
  note
    .querySelector(".delete-button")
    .addEventListener("click", () => deleteNote(index));
  note
    .querySelector("textarea")
    .addEventListener("change", (e) => updateNote(e.target.value, index));

  return note;
}
 
 

function updateDom() {
  notesEl.innerHTML = "";

  notesArray.forEach((text, index) => {
    const noteEl = createNoteEl(text, index);
    notesEl.appendChild(noteEl);
  });
  saveNotes(notesArray);
}
function updateNote(text, index) {
  notesArray[index] = text;
  console.log("change saved");

  updateDom();
}
function deleteNote(index) {
  notesArray.splice(index, 1);
  updateDom();
}

function getNotes() {
  const notes = localStorage.getItem("notes");
  if (notes) return JSON.parse(notes);
  localStorage.setItem("notes", "[]");
  return [];
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}
function createNoteTextarea(text, index) {
  const textarea = document.createElement("textarea");
  textarea.classList.add("body");
  textarea.value = text;
  textarea.addEventListener("change", (e) => {
    updateNote(e.target.value, index);
  });
  return textarea;
}

function handleEdit(index) {
  const notes = document.querySelectorAll(".note");
  const targetedNote = notes[index];
  targetedNote.classList.toggle("edit");
}

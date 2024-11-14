const notesEl = document.querySelector('.notes');
const addButton = document.querySelector("#add")
const notesArray = getNotes();

updateDom()
addButton.addEventListener('click',()=>{
    
    notesArray.push("") 
    updateDom()})

function createNoteEl(text,index){
    const note = document.createElement('div')
    note.classList.add('note')
    
    const header = createNoteHeader(index)
    note.appendChild(header) 
    const body = createNoteBody(text,index)
    note.appendChild(body)
    return note;
}

function createNoteHeader(index){
    const header = document.createElement('div')
    header.classList.add('header')
    const deleteButton = createDeleteButton(index);
    header.appendChild(deleteButton)
    const editButton = createEditButton(index)
    header.appendChild(editButton)
    return header;
}

function createNoteBody(text,index){
    const textArea = document.createElement('textarea');
    textArea.classList.add('body')
    textArea.addEventListener('change',(e)=>{
        updateNote(e.target.value,index)
        
       
    })
    textArea.setAttribute('rows',20)
    textArea.value = text;
    return textArea

}

function createDeleteButton(index){
    const button = document.createElement('i')
    button.classList.add('fa-regular')
    button.classList.add('fa-trash-can')
    button.addEventListener('click',()=>{deleteNote(index)})
    return button
}
function createEditButton(index){
    const button = document.createElement('i')
    button.classList.add('fa-solid')
    button.classList.add('fa-pen-to-square')
    return button
}

function updateDom(){
    notesEl.innerHTML=""

    notesArray.forEach((text,index)=>{

        const noteEl = createNoteEl(text,index)
        notesEl.appendChild(noteEl)
    })
    saveNotes(notesArray)
}
function updateNote(text,index){
    notesArray[index] = text
    console.log("change saved");
    
    updateDom()

}
function deleteNote(index){
    notesArray.splice(index,1)
    updateDom()
}

function getNotes(){
    const notes = localStorage.getItem('notes')
    if(notes)
        return JSON.parse(notes)
    localStorage.setItem('notes',"[]")
    return []
}

function saveNotes(notes){
    localStorage.setItem('notes',JSON.stringify(notes))
}
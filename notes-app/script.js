const notesEl = document.querySelector('.notes');
const addButton = document.querySelector("#add");
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
    const textarea = createNoteTextarea(text,index)
    note.appendChild(textarea)
    return note;
}

function createNoteHeader(index){
    const header = document.createElement('div')
    header.classList.add('header')
    const editButton = createEditButton(index)
    header.appendChild(editButton)
    const deleteButton = createDeleteButton(index);
    header.appendChild(deleteButton)
    return header;
}

function createNoteBody(text,index){ 
    const noteBody  = document.createElement('div')
    noteBody.classList.add('body')
    noteBody.innerHTML=  markdownToHTML(text)
    return noteBody

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
    button.addEventListener('click',()=>handleEdit(index))
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
function createNoteTextarea(text,index){
    const textarea = document.createElement('textarea')
    textarea.classList.add('body')
    textarea.value = text
    textarea.addEventListener('change',(e)=>{
        updateNote(e.target.value,index)
    })
    return textarea
}


function handleEdit(index){
    const notes = document.querySelectorAll('.note');
    const targetedNote = notes[index];
    targetedNote.classList.toggle('edit')
     

}

function markdownToHTML(markdown) {
    // Replace newlines with HTML line breaks
    
    // markdown = markdown.replace(/\n/g, '<br>');
    
    // Replace headers
    markdown = markdown.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
    markdown = markdown.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    markdown = markdown.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    markdown = markdown.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    markdown = markdown.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
    markdown = markdown.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>'); 
    
    console.log(markdown);
    // Replace bold text
    markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
    // Replace italic text
    markdown = markdown.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
    // Replace links
    markdown = markdown.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    
    // Replace images
    markdown = markdown.replace(/!\[(.+?)\]\((.+?)\)/g, '<img alt="$1" src="$2">');

    // Replace unordered lists
    markdown = markdown.replace(/^\s*\-\s+(.+)$/gm, '<ul><li>$1</li></ul>');
    console.log(markdown.match(/^\s*\-\s+(.+)$/g),markdown);
    
    // Replace ordered lists
    markdown = markdown.replace(/^\s*\d+\.\s+(.+)$/gm, function(match, p1) {
       
        
      return '<ol><li>' + p1 + '</li></ol>';
    });
  
    // Replace code blocks
    markdown = markdown.replace(/^```(.+?)```$/gm, function(match, p1) {
      return '<pre><code>' + p1 + '</code></pre>';
    });
  
    return markdown;
  }
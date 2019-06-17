window.onload = function() {
    let addButton = document.getElementById("saveButton");
    addButton.onclick = addNote;
    loadToDos();
    showToDos();
}

let toDoList = [{id:1, text: "first"}, {id:2, text: "second"},{id:3, text: "third"}];
let noteId = 4;

function addNote() {
    let text = document.getElementById("noteText").value;
    let id = document.getElementById("noteId").value;
    if (id) {
        let note = toDoList.find(item => item.id === Number(id));
        if (note) {
            note.text = text;
        }
    } else {
        toDoList.push({id: noteId, text: text});
        noteId++;
    }
    showToDos();
    clearForm();
}

function clearForm() {
    let textInput = document.getElementById("noteText");
    textInput.value = "";
    let idInput = document.getElementById("noteId");
    idInput.value = "";
}

function loadToDos() {
    return toDoList;
}

function showToDos() {
    let wrapper = document.getElementById("toDoList");
    wrapper.innerHTML = "";
    for (let note of toDoList) {
        let item = document.createElement("li");
        item.id = note.id;
        item.classList.add("note")
        wrapper.appendChild(item);

        let noteText = document.createElement("span");
        noteText.innerText = note.text;
        item.appendChild(noteText);

        let buttonWrapper = document.createElement("span");
        buttonWrapper.classList.add("actionButtons");
        item.appendChild(buttonWrapper);

        let editButton = document.createElement("button");
        editButton.innerHTML = '<i class="far fa-edit"></i>';
        buttonWrapper.appendChild(editButton); 

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML  = '<i class="far fa-trash-alt"></i>';
        buttonWrapper.appendChild(deleteButton);

        editButton.onclick = editNote;
        deleteButton.onclick = deleteNote;
    }
}

/**
 * 
 * @param {MouseEvent} e 
 */
function editNote(e) {
    let noteText = document.getElementById("noteText");
    noteText.value = e.target.closest("li").querySelector("span").innerText;
    let noteId = document.getElementById("noteId");
    noteId.value = e.target.closest("li").id.replace(/^\D+/, ""); 
    noteText.focus();
}

function deleteNote(e) {
    let id = e.target.closest("li").id.replace(/^\D+/, "");
    toDoList = toDoList.filter(item => item.id !== Number(id));
    showToDos();
}
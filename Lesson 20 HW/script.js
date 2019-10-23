const BOARD_DESCRIPTION_CLASS = 'board-note-description';
const DELETE_NOTE_BUTTON = 'delete-note-btn'

const boardNoteTemplate = document.getElementById('board-note-template').innerHTML;
const boardContainer = document.getElementById('board');

const addNoteBtn = document.querySelector('.add-note-btn');

boardContainer.addEventListener('click', onBoardEvent);
addNoteBtn.addEventListener('click', createNewEmptyNote)

let listOfNotes = [];

init();

function init() {
    listOfNotes = getState();
    renderBoard(listOfNotes)

}


function saveState() {
    localStorage.setItem('board', JSON.stringify(listOfNotes));
}


function getState() {
    const data = localStorage.getItem('board');

    return data ? JSON.parse(data) : [];
}


function onNoteChange(el) {
    const id = el.parentNode.dataset.noteId

    listOfNotes.find(x => x.id == id).description = el.value;

    saveState();
}


function onBoardEvent(e) {
    const targetParentId = e.target.parentNode.dataset.noteId;        

    switch (true) {
        case e.target.classList.contains(BOARD_DESCRIPTION_CLASS):
            e.target.addEventListener('change', () => {
                onNoteChange(e.target)
            });
            break;

        case e.target.classList.contains(DELETE_NOTE_BUTTON):
                deleteNote(targetParentId);
            break;
    }
}


function deleteNote(noteId){
    listOfNotes = listOfNotes.filter(el => el.id != noteId);

    deleteNoteItem(noteId);

    saveState();
}


function deleteNoteItem(noteId){
    const element = getNoteById(noteId);
    element && element.remove(); 
}


function getNoteById(noteId){
    return boardContainer.querySelector(`[data-note-id="${noteId}"]`)
}


function createNewEmptyNote() {
    const newEmptyNote = {
        id: Date.now(),
        description: ''
    }

    boardContainer.insertAdjacentHTML('beforeend', generateNote(newEmptyNote));
    listOfNotes.push(newEmptyNote);

    saveState();
}


function generateNote(note) {
    return boardNoteTemplate
        .replace('{{id}}', note.id)
        .replace('{{noteDescriptionText}}', note.description)
}


function renderBoard(data) {
    const boardItemsHtml = data.map((data) => generateNote(data));
    boardContainer.innerHTML = boardItemsHtml.join('');
}


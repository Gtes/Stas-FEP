const BOARD_DESCRIPTION_CLASS = 'board-note-description';
const DELETE_NOTE_BUTTON = 'delete-note-btn'


let notesItems = [{
        id: 1,
        description: 'do something description'
    },
    {
        id: 2,
        description: 'do something description'
    },
    {
        id: 3,
        description: 'do something description'
    },
    {
        id: 4,
        description: 'do something description'
    }
];

const boardNoteTemplate = document.getElementById('board-note-template').innerHTML;
const boardContainer = document.getElementById('board');

const addNoteBtn = document.querySelector('.add-note-btn');

boardContainer.addEventListener('click', onBoardEvent);


addNoteBtn.addEventListener('click', createEmptyNote)



function init() {
    notesItems = getState();
    renderBoard(notesItems)

}

function saveState() {
    localStorage.setItem('board', JSON.stringify(notesItems));
    // console.log(localStorage.getItem('board'));
}

function getState() {
    const data = localStorage.getItem('board');

    return data ? JSON.parse(data) : [];
}


function onNoteChange(el) {
    const id = el.parentNode.dataset.noteId


    notesItems.find(x => x.id == id).description = el.value;

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
                deleteNote(targetParentId)
            break;
    }
}


function deleteNote(noteId){
    notesItems = notesItems.filter(el => el.id != noteId);

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


function createEmptyNote() {
    const newEmptyNote = {
        id: Date.now(),
        description: ''
    }

    boardContainer.insertAdjacentHTML('beforeend', generateNote(newEmptyNote));
    notesItems.push(newEmptyNote);

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

init();

// renderBoard(notesItems)

// console.log(generateNote(notesItems))











// function submitTodoItem() {
//     createTodoItem(newTotoItemInput.value);

//     newTodoListFormSubmit.reset();
// }

// function createNoteItem(note) {
//     const newNote = {
//         id: Date.now(),
//         titile,
//         description

//     }
//     addNoteItem(newNote);
// }

// function addNoteItem(note){
//     boardNoteTemplate.push(note);

//     addNoteItemElement(note);
// }

// function addNoteItemElement(note){
//     const todoItemHtml = generateNote(note);

//     boardContainer.insertAdjacentHTML()
// }
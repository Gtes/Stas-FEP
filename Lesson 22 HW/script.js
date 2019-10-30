$(function () {
    const BOARD_DESCRIPTION_CLASS = 'board-note-description';
    const BOARD_TITLE_CLASS = 'board-note-title';

    const DELETE_NOTE_BUTTON = 'delete-note-btn'

    const NOTE_DESCRIPTION_FIELD = 'description';
    const NOTE_TITLE_FIELD = 'title';

    const boardNoteTemplate = document.getElementById('board-note-template').innerHTML;
    const boardContainer = document.getElementById('board');

    const $addNoteBtn = $('.add-note-btn');

    boardContainer.addEventListener('click', onBoardEvent);
    $addNoteBtn.on('click', createNewEmptyNote)

    let listOfNotes = [];

    init();

    function init() {
        listOfNotes = getState();
        renderBoard(listOfNotes)
    }


    function getState() {
        const data = localStorage.getItem('board');

        return data ? JSON.parse(data) : [];
    }

    function saveState() {
        localStorage.setItem('board', JSON.stringify(listOfNotes));
    }

    function renderBoard(data) {
        const boardItemsHtml = data.map((data) => generateNote(data));
        boardContainer.innerHTML = boardItemsHtml.join('');
    }


    function generateNote(note) {
        return boardNoteTemplate
            .replace('{{id}}', note.id)
            .replace('{{noteTitleText}}', note.title)
            .replace('{{noteDescriptionText}}', note.description)
            .replace('{{x}}', note.x)
            .replace('{{y}}', note.y)
    }


    function onBoardEvent(e) {
        const targetParentId = e.target.parentNode.dataset.noteId;

        switch (true) {
            case e.target.classList.contains(BOARD_DESCRIPTION_CLASS):
                e.target.addEventListener('change', () => {
                    onNoteChange(e.target, NOTE_DESCRIPTION_FIELD)
                }, {
                    once: true
                });
                break;

            case e.target.classList.contains(BOARD_TITLE_CLASS):
                e.target.addEventListener('change', () => {
                    onNoteChange(e.target, NOTE_TITLE_FIELD)
                }, {
                    once: true
                });
                break;

            case e.target.classList.contains(DELETE_NOTE_BUTTON):
                deleteNote(targetParentId);
                break;
        }
    }


    function onNoteChange(el, field) {
        const id = el.parentNode.dataset.noteId

        listOfNotes.find(x => x.id == id)[field] = el.value;

        saveState();
    }


    function deleteNote(noteId) {
        listOfNotes = listOfNotes.filter(el => el.id != noteId);

        deleteNoteItem(noteId);

        saveState();
    }


    function deleteNoteItem(noteId) {
        const element = getNoteById(noteId);
        element && element.remove();
    }


    function getNoteById(noteId) {
        return boardContainer.querySelector(`[data-note-id="${noteId}"]`)
    }


    function createNewEmptyNote() {
        $('#mytest').dialog('open');

    }

    function testNote() {
        const newNote = {
            id: Date.now(),
            title: $('#mytest > .board-note-title').val(),
            description: $('#mytest > .board-note-description').val(),
            x: '',
            y: ''
        }

        return newNote;
    }



    $('#mytest').dialog({
        modal: true,
        draggable: false,
        autoOpen: false,
        modal: true,
        buttons: {
            add: {
                text: "Add",
                click: function () {

                    let hanote = testNote();

                    boardContainer.insertAdjacentHTML('beforeend', generateNote(hanote));
                    listOfNotes.push(hanote);

                    saveState();
                    $('.board-note').draggable();
                    $(this).dialog("close");
                },
            },
            cancel: {
                text: "Cancel",
                click: function () {
                    $(this).dialog("close");
                }
            }
        }


    });

    

    $('.board-note').draggable({
        zIndex: 100,
        // other options...
        drag: function (event, ui) {
            //    dragposition = ui.position;
        },

        stop: function (event, ui) {
            
            const id = $(this).data().noteId;

            listOfNotes.find(be => be.id == id)['x'] = ui.position.top;
            listOfNotes.find(be => be.id == id)['y'] = ui.position.left;

            saveState();

            

        }
    });


});
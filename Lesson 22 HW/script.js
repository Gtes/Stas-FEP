$(function () {
    const CREATE_NOTE_FORM = '#createNoteForm'
    const BOARD_DESCRIPTION_CLASS = 'board-note-description';
    const BOARD_TITLE_CLASS = 'board-note-title';

    const DELETE_NOTE_BUTTON = 'delete-note-btn'

    const NOTE_DESCRIPTION_FIELD = 'description';
    const NOTE_TITLE_FIELD = 'title';

    const boardNoteTemplate = document.getElementById('board-note-template').innerHTML;
    const boardContainer = document.getElementById('board');

    const $addNoteBtn = $('.add-note-btn');

    boardContainer.addEventListener('click', onBoardEvent);
    $addNoteBtn.on('click', createNewnNoteForm)

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
        console.log(e.target)
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


    function createNewnNoteForm() {
        $(CREATE_NOTE_FORM).dialog('open');
    }

    function getFormData() {
        const newNoteData = {
            id: Date.now(),
            title: $(`${CREATE_NOTE_FORM} > .board-note-title`).val(),
            description: $(`${CREATE_NOTE_FORM}  > .board-note-description`).val(),
            x: 1,
            y: 1
        }

        return newNoteData;
    }

    function resetForm() {
        $(`${CREATE_NOTE_FORM} > .board-note-title`).val('');
        $(`${CREATE_NOTE_FORM}  > .board-note-description`).val('');
    }


    $(CREATE_NOTE_FORM).dialog({
        modal: true,
        draggable: false,
        autoOpen: false,
        modal: true,
        buttons: {
            add: {
                text: "Add",
                click: function () {

                    listOfNotes.push(getFormData());
                    
                    
                    boardContainer.insertAdjacentHTML('beforeend', generateNote(getFormData()));

                    saveState();

                    


                    $(".board-note").draggable(saveNotePosition());

                    
                    resetForm();


                    $(this).dialog("close");
                },
            },
            cancel: {
                text: "Cancel",
                click: function () {
                    $(this).dialog("close");
                }
            }
        },
        beforeClose: $('.board-note').draggable(saveNotePosition())


    });


    function saveNotePosition() {
        const savePos = {
            stop: function (event, ui) {
                console.log(ui);
                console.log(this);
                const id = $(this).data().noteId;

                listOfNotes.find(be => {
                    console.log(be)
                    return be.id == id
                })['x'] = ui.position.top;
                listOfNotes.find(be => be.id == id)['y'] = ui.position.left;
                saveState();
            }

        }
        return savePos;
    }

    $('.board-note').draggable(saveNotePosition());


});
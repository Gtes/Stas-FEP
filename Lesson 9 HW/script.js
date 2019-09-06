const listItemTemplate = document.getElementById('listItemTemplate').innerHTML;
const taskName = document.getElementById('taskName');
const todoList = document.getElementById('todoList');
const addTask = document.getElementById('addTask');

addTask.addEventListener('click', addNewToDoTask);
todoList.addEventListener('click', taskControl);


function generateLi(inputValue) {
    return listItemTemplate.replace('{{taskName}}', inputValue);
}


function addNewToDoTask() {
    if (taskName.value.trim() == "") {
        alert('Input Task Name');
    } else {
        todoList.innerHTML += generateLi(taskName.value);
        taskName.select();
    }
}


function taskControl(element) {
    switch (true) {
        case element.target.classList.contains('removeTask'):
            removeTask(element.target.parentElement);
            break;

        case element.target.classList.contains('taskText'):
            toggleClass(element.target, 'done');
            break;
    }
}


function removeTask(element) {
    element.remove();
}

function toggleClass(element, className) {
    element.classList.toggle(className);
}



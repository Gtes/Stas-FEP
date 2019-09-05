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
    let targetElement = element.target;
    switch (true) {
        case targetElement.classList.contains('removeTask'):
            removeTask(targetElement);
            break;

        case targetElement.classList.contains('taskText'):
            toggleClass(targetElement, 'done');
            break;
    }
}


function removeTask(element) {
    element.parentElement.remove();
}

function toggleClass(element, className) {
    element.classList.toggle(className);
}



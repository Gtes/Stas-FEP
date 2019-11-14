import $ from 'jquery';

$(function () {
    class Todo {
        // static addTodoItemForm = '.addTodoItem';
        static listItemTemplate = '#listItemTemplate';
        static todoList = $('#todoList')
        static lisOfTodos = []

        constructor() {
            this.todoList = $('#todoList');
            this.addTodoItemButton = $("#addTodoItemButton")
            
            this.init();

            this.todoList.on('click', '.removeTask', this.deleteTodoListItem.bind(this));
            this.todoList.on('click', '.taskText', this.changeTodoStatus.bind(this));
            this.addTodoItemButton.on('click', this.addTodoItem.bind(this));
        }


        init() {
            Todo.lisOfTodos = this.getState();
            Todo.renderBoard(Todo.lisOfTodos)

        }

        static renderBoard(data) {
            const todoItemsHtml = data.map((data) => Todo.generateListItem(data));

            Todo.todoList.html(todoItemsHtml.join(''));
        }


        static generateListItem(todoItem) {
            return $(listItemTemplate).html()
                .replace('{{taskName}}', todoItem.name)
                .replace('{{id}}', todoItem.id)
                .replace('{{isDone}}', todoItem.isDone ? 'isDone' : '');
        }


        getState() {
            const data = localStorage.getItem('todo');
            return data ? JSON.parse(data) : [];
        }


        saveState() {
            localStorage.setItem('todo', JSON.stringify(Todo.lisOfTodos));
        }

        changeTodoStatus(el) {
            const targetDataId = $(el.target).closest('li[data-todo-id]').data('todo-id');
            
            switch (true) {
                case $(el.target).hasClass('isDone'):
                    $(el.target).removeClass('isDone');
                    this.changeDoneField(targetDataId, 'isDone', false);
                    this.saveState();
                    break;

                case !$(el.target).hasClass('isDone'):
                    $(el.target).addClass('isDone');
                    this.changeDoneField(targetDataId, 'isDone', true);
                    this.saveState();
                    break;
            }
        }

        changeDoneField(id, field, status) {
            Todo.lisOfTodos.find(x => x.id == id)[field] = status;
        }

        deleteTodoListItem(el) {
            const targetDataId = $(el.target).closest('li[data-todo-id]').data('todo-id');
            console.log(targetDataId);
            this.deleteTodo(targetDataId);
        }

        deleteTodo(todoId) {
            Todo.lisOfTodos = Todo.lisOfTodos.filter(el => {
                return el.id != todoId
            });

            this.deleteTodoItem(todoId);

            this.saveState();
        }

        deleteTodoItem(todoId) {
            const element = this.getTodoById(todoId);
            element && element.remove();
        }


        getTodoById(todoId) {
            return $(`[data-todo-id="${todoId}"]`);
        }


        addTodoItem() {
            let noteData = this.getNoteData()
            Todo.todoList.append(Todo.generateListItem(noteData));
            Todo.lisOfTodos.push(noteData);
            console.log(Todo.lisOfTodos)
            this.saveState();
        }

        getNoteData() {
            const newTodoData = {
                id: Date.now(),
                name: $('#taskName').val(),
                isDone: false
            }

            return newTodoData;
        }
    }

    const todo = new Todo($('#container'));

})
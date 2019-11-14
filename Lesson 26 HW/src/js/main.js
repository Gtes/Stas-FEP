import $ from 'jquery';
import { saveState, getState } from './localStorage';

$(function () {
    class Todo {
    
        static listItemTemplate = '#listItemTemplate';
        static todoList = $('#todoList')

        constructor() {
            this.todoList = $('#todoList');
            this.addTodoItemButton = $("#addTodoItemButton")
            
            this.lisOfTodos = []
            
            this.getState = getState;
            this.saveState = saveState;
            
            this.init();

            this.todoList.on('click', '.removeTask', this.deleteTodoListItem.bind(this));
            this.todoList.on('click', '.taskText', this.changeTodoStatus.bind(this));
            this.addTodoItemButton.on('click', this.addTodoItem.bind(this));
        }


        init() {
            this.lisOfTodos = this.getState();
            Todo.renderBoard(this.lisOfTodos)

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
            this.lisOfTodos.find(x => x.id == id)[field] = status;
        }

        deleteTodoListItem(el) {
            const targetDataId = $(el.target).closest('li[data-todo-id]').data('todo-id');
            console.log(targetDataId);
            this.deleteTodo(targetDataId);
        }

        deleteTodo(todoId) {
            this.lisOfTodos = this.lisOfTodos.filter(el => {
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
            let todoData = this.getTodoData()
            
            Todo.todoList.append(Todo.generateListItem(todoData));
            this.lisOfTodos.push(todoData);
            
            this.saveState();

            $('#taskName').val('')
            $('#taskName').focus()
        }

        getTodoData() {
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
"use strict";
const todosQuantity = document.getElementById("todosQuantity");
const currDate = document.getElementById("dateInHeader");
currDate.textContent = new Date().toLocaleDateString('pl-PL');
class ToDoList {
    constructor() {
        const storedTodos = localStorage.getItem('todos');
        this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    }
    addTodo(shortDescription, longDescription = "brak", date = "brak") {
        const newTodo = {
            id: new Date().getTime(),
            shortDescription,
            longDescription,
            date
        };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        this.renderTodoList();
        this.clearForm();
        todosQuantity.textContent = String(this.todos.length);
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToLocalStorage();
        this.renderTodoList();
        todosQuantity.textContent = String(this.todos.length);
    }
    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    renderTodoList() {
        var _a;
        todosQuantity.textContent = String((_a = this.todos.length) !== null && _a !== void 0 ? _a : 0);
        const todoListElement = document.getElementById('todo-list');
        if (todoListElement) {
            todoListElement.innerHTML = '';
        }
        this.todos.forEach(todo => {
            var _a, _b;
            const todoItemElement = document.createElement('div');
            todoItemElement.classList.add('todo-item');
            const todoDescriptionElement = document.createElement('div');
            todoDescriptionElement.classList.add('todo-description');
            todoDescriptionElement.innerHTML = `
            <h3><span>Short description: </span>${todo.shortDescription}</h3>
            <p><span>Long description: </span>${(_a = todo.longDescription) !== null && _a !== void 0 ? _a : "brak"}</p>
            <p><span>Date: </span>${(_b = todo.date) !== null && _b !== void 0 ? _b : "brak"}</p>
            `;
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Remove';
            deleteButton.addEventListener('click', () => {
                this.deleteTodo(todo.id);
            });
            todoItemElement.appendChild(todoDescriptionElement);
            todoItemElement.appendChild(deleteButton);
            if (todoListElement) {
                todoListElement.appendChild(todoItemElement);
            }
        });
    }
    clearForm() {
        const shortDescriptionInput = document.getElementById('short-description');
        const longDescriptionInput = document.getElementById('long-description');
        const dateInput = document.getElementById('date');
        shortDescriptionInput.value = '';
        longDescriptionInput.value = '';
        dateInput.value = '';
    }
}
const todoList = new ToDoList();
// Obsługa formularza
const formElement = document.getElementById('todo-form');
if (formElement) {
    formElement.addEventListener('submit', event => {
        event.preventDefault();
        const shortDescription = document.getElementById('short-description').value;
        const longDescription = document.getElementById('long-description').value;
        const date = document.getElementById('date').value;
        todoList.addTodo(shortDescription, longDescription === "" ? "brak" : longDescription, date === "" ? "brak" : date);
    });
}
todoList.renderTodoList();
//# sourceMappingURL=index.js.map
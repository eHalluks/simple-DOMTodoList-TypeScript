/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("\nclass ToDoList {\n    constructor() {\n        const storedTodos = localStorage.getItem('todos');\n        this.todos = storedTodos ? JSON.parse(storedTodos) : [];\n    }\n    addTodo(shortDescription, longDescription, date) {\n        const newTodo = {\n            id: new Date().getTime(),\n            shortDescription,\n            longDescription,\n            date\n        };\n        this.todos.push(newTodo);\n        this.saveToLocalStorage();\n        this.renderTodoList();\n    }\n    deleteTodo(id) {\n        this.todos = this.todos.filter(todo => todo.id !== id);\n        this.saveToLocalStorage();\n        this.renderTodoList();\n    }\n    saveToLocalStorage() {\n        localStorage.setItem('todos', JSON.stringify(this.todos));\n    }\n    renderTodoList() {\n        const todoListElement = document.getElementById('todo-list');\n        if (todoListElement) {\n            todoListElement.innerHTML = '';\n        }\n        this.todos.forEach(todo => {\n            const todoItemElement = document.createElement('div');\n            todoItemElement.classList.add('todo-item');\n            const todoDescriptionElement = document.createElement('div');\n            todoDescriptionElement.classList.add('todo-description');\n            todoDescriptionElement.innerHTML = `\r\n            <h3><span>Temat: </span>${todo.shortDescription}</h3>\r\n            <p><span>Pełny opis: </span>${todo.longDescription}</p>\r\n            <p><span>Data: </span>${todo.date}</p>\r\n            `;\n            const deleteButton = document.createElement('button');\n            deleteButton.innerText = 'Remove';\n            deleteButton.addEventListener('click', () => {\n                this.deleteTodo(todo.id);\n            });\n            todoItemElement.appendChild(todoDescriptionElement);\n            todoItemElement.appendChild(deleteButton);\n            if (todoListElement) {\n                todoListElement.appendChild(todoItemElement);\n            }\n        });\n    }\n}\nconst todoList = new ToDoList();\n// Obsługa formularza\nconst formElement = document.getElementById('todo-form');\nif (formElement) {\n    formElement.addEventListener('submit', event => {\n        event.preventDefault();\n        const shortDescription = document.getElementById('short-description').value;\n        const longDescription = document.getElementById('long-description').value;\n        const date = document.getElementById('date').value;\n        todoList.addTodo(shortDescription, longDescription, date);\n    });\n}\ntodoList.renderTodoList();\n\n\n//# sourceURL=webpack://new-folder/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;
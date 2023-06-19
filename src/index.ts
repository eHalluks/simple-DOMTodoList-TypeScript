const todosQuantity = document.getElementById("todosQuantity")!;
const currDate = document.getElementById("dateInHeader")!;
currDate.textContent = new Date().toLocaleDateString('pl-PL');

const shortDescriptionError = document.getElementById('shortDescriptionError')!;
const longDescriptionError = document.getElementById('longDescriptionError')!;

interface Todo {
    id: number;
    shortDescription: string;
    longDescription?: string;
    date?: string;
}

class ToDoList {

    todos: Todo[];
    constructor() {
        const storedTodos = localStorage.getItem('todos');
        this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    }

    addTodo(shortDescription: string, longDescription: string = "brak", date: string = "brak") {

        const newTodo: Todo = {
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

    deleteTodo(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToLocalStorage();
        this.renderTodoList();
        todosQuantity.textContent = String(this.todos.length);
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    renderTodoList() {

        todosQuantity.textContent = String(this.todos.length ?? 0);
        const todoListElement: HTMLElement | null = document.getElementById('todo-list');

        if(todoListElement){
            todoListElement.innerHTML = '';
        }

        this.todos.forEach(todo => {
            const todoItemElement = document.createElement('div');
            todoItemElement.classList.add('todo-item');

            const todoDescriptionElement = document.createElement('div');
            todoDescriptionElement.classList.add('todo-description');
            todoDescriptionElement.innerHTML = `
            <h3><span>Short description: </span>${todo.shortDescription}</h3>
            <p><span>Long description: </span>${todo.longDescription ?? "brak"}</p>
            <p><span>Date: </span>${todo.date ?? "brak"}</p>
            `;

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Remove';

            deleteButton.addEventListener('click', () => {
                this.deleteTodo(todo.id);
            });

            todoItemElement.appendChild(todoDescriptionElement);
            todoItemElement.appendChild(deleteButton);

            if(todoListElement){
                todoListElement.appendChild(todoItemElement);
            }


        });
    }

    clearForm() {
        const shortDescriptionInput = document.getElementById('short-description') as HTMLInputElement;
        const longDescriptionInput = document.getElementById('long-description') as HTMLInputElement;
        const dateInput = document.getElementById('date') as HTMLInputElement;

        shortDescriptionInput.value = '';
        longDescriptionInput.value = '';
        dateInput.value = '';
    }

}

const getDataFromHtml = () => {

    const todoList = new ToDoList();

    const formElement = document.getElementById('todo-form');

    if(formElement) {
        formElement.addEventListener('submit', event => {

            event.preventDefault();

            const shortDescription = (document.getElementById(
                'short-description'
            ) as HTMLInputElement).value!;

            const longDescription = (document.getElementById(
                'long-description'
            ) as HTMLInputElement).value!;

            const date = (document.getElementById('date') as HTMLInputElement).value;



            if(shortDescription.length > 50) {
                shortDescriptionError.removeAttribute("hidden");
                setTimeout(() => {
                    shortDescriptionError.setAttribute("hidden", "hidden");
                }, 5000);
                shortDescriptionError.textContent = "Short description cannot be longer than 50 characters.";
                return;

            }else if(longDescription.length > 550){
                longDescriptionError.removeAttribute("hidden");
                setTimeout(() => {
                    longDescriptionError.setAttribute("hidden", "hidden");
                }, 5000);
                longDescriptionError.textContent = "Long description cannot be longer than 550 characters.";
                return;
            }

            todoList.addTodo(shortDescription,
                longDescription === "" ? "brak" : longDescription, date === "" ? "brak" : date);
        });
    }

    todoList.renderTodoList();
}

getDataFromHtml();


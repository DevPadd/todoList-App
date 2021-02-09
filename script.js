// selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// functions

function addTodo (event) {
    // prevent button for doing default action
    event.preventDefault();
    
    // creating todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // creating todo li 
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-li');
    newTodo.innerText = todoInput.value;
    todoDiv.append(newTodo);

    // save it to localStorage
    saveLocalTodos(todoInput.value);

    // completed todo button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('completed-button');
    todoDiv.append(completedButton);

    // delete todo button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add('delete-button');
    todoDiv.append(deleteButton);

    // append todoDiv to todoList
    todoList.append(todoDiv);

    // clear the input value
    todoInput.value = '';
}


function deleteAndCompleted (event) {
    const item = event.target;
    const todo = item.parentElement;

    if (item.classList[0] === 'delete-button') {

        todo.classList.add('delete-todo-animation');
        removeLocalTodos(todo);
        todo.classList.remove('completed');

        todo.addEventListener('transitionend', function() {
            todo.classList.remove('delete-todo-animation');
            todo.remove();
        })

    } else if (item.classList[0] === 'completed-button') {

        item.parentElement.classList.add('completed');

    }
}

function filterTodo (event) {
    const todos = todoList.children;

    for (let element of todos) {
        
        switch(event.target.value) {

            case 'all': 

                element.style.display = 'flex';

            break;

            case 'completed':

                if(element.classList.contains('completed')) {
                    element.style.display = 'flex';
                } else {
                    element.style.display = 'none';
                }

            break;

            case 'uncompleted':

                if(!element.classList.contains('completed')) {
                    element.style.display = 'flex';
                } else {
                    element.style.display = 'none';
                }

            break;

            default:

                alert('uhh, something went wrong :(');
                
            break;

        }

    }

}

function saveLocalTodos (todo) {

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos () {

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {

        // creating todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // creating todo li 
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-li');
        newTodo.innerText = todo;
        todoDiv.append(newTodo);

        // completed todo button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add('completed-button');
        todoDiv.append(completedButton);

        // delete todo button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteButton.classList.add('delete-button');
        todoDiv.append(deleteButton);

        // append todoDiv to todoList
        todoList.append(todoDiv);

    }) ;

}

function removeLocalTodos (todo) {

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}





// EventListener

document.addEventListener('DOMContentLoaded', getTodos);

todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteAndCompleted);

filterOption.addEventListener('change', filterTodo);
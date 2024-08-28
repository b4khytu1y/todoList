let todos = [];
let done = [];

const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');

todoInput.addEventListener('input', () => {
    addButton.disabled = todoInput.value.trim() === '';
});

addButton.addEventListener('click', () => addTodo());
todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && todoInput.value.trim() !== '') {
        addTodo();
    }
});

function addTodo() {
    const text = todoInput.value.trim();
    const newTodo = {
        id: generateID(),
        content: text,
        date: new Date()
    };

    todos.push(newTodo);
    renderTodos();
    todoInput.value = '';
    addButton.disabled = true;

    setTimeout(() => alert(`🛎 Не забудь про: ${text}`), 10000);
}

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

function renderTodos() {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    if (todos.length === 0) {
        todoList.innerHTML = '<li>Список еще пуст</li>';
    }

    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.innerHTML = `
            <input type="radio" name="todoItem" onclick="markAsDone(${todo.id})">
            <span>${todo.content} - ${formatDate(todo.date)}</span>
            <div>
                <button onclick="editTodo(${todo.id})">✏️</button>
                <button onclick="deleteTodo(${todo.id})">❌</button>
            </div>
        `;
        todoList.appendChild(todoItem);
    });

    done.forEach(doneItem => {
        const doneItemElement = document.createElement('li');
        doneItemElement.classList.add('done-item');
        doneItemElement.innerHTML = `
            <input type="radio" checked disabled>
            <span>${doneItem.content} - ${formatDate(doneItem.date)}</span>
            <button onclick="deleteDone(${doneItem.id})">❌</button>
        `;
        doneList.appendChild(doneItemElement);
    });
}

function formatDate(date) {
    return date.toLocaleString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function markAsDone(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex > -1) {
        const [doneTodo] = todos.splice(todoIndex, 1);
        done.push(doneTodo);
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function deleteDone(id) {
    done = done.filter(doneItem => doneItem.id !== id);
    renderTodos();
}

function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    const newContent = prompt('Редактировать дело:', todo.content);
    if (newContent) {
        todo.content = newContent;
        renderTodos();
    }
}

renderTodos();

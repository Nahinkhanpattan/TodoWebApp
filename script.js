document.addEventListener("DOMContentLoaded", loadTodos);

function addTodo() {
    let input = document.getElementById("todoInput");
    let task = input.value.trim();
    if (task === "") return;

    createTaskElement(task);
    saveToLocalStorage(task);

    input.value = "";
}

function createTaskElement(task) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task;

    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = function () {
        let newTask = prompt("Edit Task:", span.textContent);
        if (newTask) {
            updateLocalStorage(span.textContent, newTask);
            span.textContent = newTask;
        }
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        li.remove();
        removeFromLocalStorage(span.textContent);
    };

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonsDiv);

    document.getElementById("todoList").appendChild(li);
}

function loadTodos() {
    let tasks = JSON.parse(localStorage.getItem("todos")) || [];
    tasks.forEach(createTaskElement);
}

function saveToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("todos")) || [];
    tasks.push(task);
    localStorage.setItem("todos", JSON.stringify(tasks));
}

function updateLocalStorage(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem("todos")) || [];
    let index = tasks.indexOf(oldTask);
    if (index !== -1) {
        tasks[index] = newTask;
        localStorage.setItem("todos", JSON.stringify(tasks));
    }
}

function removeFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("todos")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("todos", JSON.stringify(tasks));
}

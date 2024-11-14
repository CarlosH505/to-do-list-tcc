const todoForm = document.querySelector("#to-do");
const todoInput = document.querySelector("#to-do-input");
const todoList = document.querySelector("#to-do-list");
const editForm = document.querySelector("#to-do-edit");
const editInput = document.querySelector("#edit-input");
const cancelEdit = document.querySelector("#cancel-edit");

let oldInputValue;

const saveTodo = (text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")
    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-to-do");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-to-do");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-to-do");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo)
    todoInput.value = ""
    todoInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => {

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    })
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputValue = todoInput.value

    if (inputValue) {
        saveTodo(inputValue)
    }

});

document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText
    }

    if (targetEl.classList.contains("finish-to-do")) {
        parentEl.classList.toggle("done")
    }

    if (targetEl.classList.contains("remove-to-do")) {
        parentEl.remove()
    }

    if (targetEl.classList.contains("edit-to-do")) {
        toggleForms()
        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

cancelEdit.addEventListener("click", (e) => {
    e.preventDefault()

    toggleForms()
})

editForm.addEventListener("submit" , (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms()
})
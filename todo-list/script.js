const inputTodo = document.querySelector(".input-todo");
const todoList = document.querySelector(".todo-list");

let todos = [];

inputTodo.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.value.trim() !== "") {
    addTodo(event.target.value.trim());
    event.target.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  renderTodos();
});

function addTodo(task) {
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    body: task,
    status: false,
  };
  todos.push(newTodo);
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, status: !todo.status } : todo
  );
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.textContent = todo.body;
    if (todo.status) {
      todoItem.classList.add("done");
    }
    todoItem.addEventListener("click", () => toggleTodo(todo.id));
    todoItem.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      deleteTodo(todo.id);
    });
    todoList.appendChild(todoItem);
  });
}

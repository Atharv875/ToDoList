// ToDoList - main script
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");
const filterButtons = document.querySelectorAll(".filters button");

const STORAGE_KEY = "todolist.tasks";
let tasks = loadTasks();

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

let currentFilter = "all";

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  task.done = !task.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function render() {
  list.innerHTML = "";
  const visible = tasks.filter((task) => {
    if (currentFilter === "active") return !task.done;
    if (currentFilter === "completed") return task.done;
    return true;
  });

  visible.forEach((task) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;

    const del = document.createElement("button");
    del.textContent = "✕";
    del.className = "delete";
    del.title = "Delete task";
    del.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, span, del);
    list.appendChild(li);
  });

  const left = tasks.filter((t) => !t.done).length;
  count.textContent = left + (left === 1 ? " task" : " tasks") + " left";
  save();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") return; // ignore empty or blank tasks
  tasks.push({ id: Date.now(), text: text, done: false });
  input.value = "";
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    render();
  });
});

render();

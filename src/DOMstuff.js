import { createProject as createProjectLogic, switchToProject } from "./script";

function toggleSidebar() {
  let sidebar = document.querySelector(".sidebar");
  if (!(sidebar.style.display === "unset")) {
    sidebar.style.display = "unset";
  } else {
    sidebar.style.display = "none";
  }
}

function newTodoForm() {
  let todoForm = document.querySelector("form.new-todo");
  if (todoForm.style.display === "block") {
    todoForm.style.display = "none";
  } else {
    todoForm.style.display = "block";
    // clear all inputs
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#date").value = "";
    document.querySelector("#prio").value = "";
    document.querySelector("#projectNumber").value = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".switch-menu-btn")
    .addEventListener("click", toggleSidebar);
  document
    .querySelector(".new-todo-btn")
    .addEventListener("click", newTodoForm);
  document
    .querySelector(".new-project-btn")
    .addEventListener("click", newProject);
  document
    .querySelector(".first-project")
    .addEventListener("click", () => switchToProject(0));
});

function newProject() {
  const projectNumber = createProjectLogic();
  let project = document.createElement("button");
  project.addEventListener("click", () => switchToProject(projectNumber));
  project.classList.add("menu-item");
  project.textContent = "Project " + projectNumber;
  let parentNode = document.getElementById("new-project-btn").parentNode;
  let lastItem = document.getElementById("new-project-btn");
  parentNode.insertBefore(project, lastItem);
}

function displayTodo(todoClass) {
  let todoElement = document.createElement("li");
  todoElement.classList.add(`todo${todoClass.priority}`);
  let todoTitle = document.createElement("h4");
  todoTitle.classList.add("todo-title");
  todoTitle.textContent = todoClass.title;
  let todoDescription = document.createElement("p");
  todoDescription.classList.add("todo-description");
  todoDescription.textContent = todoClass.description;
  todoElement.append(todoTitle, todoDescription);
  document.querySelector(".todos").append(todoElement);
}

export { newTodoForm, displayTodo };

import './style.css';
import './DOMstuff.js';
import { newTodoForm as hideTodoForm, displayTodo } from './DOMstuff';

const projects = (() => {
  let vault = [[]];
  let currentProject = 0;
  let totalProjects = 0;

  return {
    vault,
    currentProject,
    totalProjects,
  };
})();

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

function createProject() {
  projects.vault.push([]);
  projects.currentProject++;
  projects.totalProjects++;
  return projects.totalProjects;
}

function showTodos() {
  // Clear previous todos
  document.querySelector('.todos').innerHTML = '';
  // display every todo from a current project
  projects.vault[projects.currentProject].forEach((todo) => {
    displayTodo(todo);
  });
}

function switchToProject(number) {
  projects.currentProject = number;
  showTodos();
}

function createTodo(title, description, dueDate, priority, projectNumber) {
  // if project number not set, set it to current project
  if (!projectNumber) projectNumber = projects.currentProject;

  const newTodo = new Todo(title, description, dueDate, priority);
  projects.vault[projectNumber].push(newTodo);
  localStorage.setItem(`vault${projectNumber}`, newTodo);
  showTodos();
}

function deleteTodo(id) {
  delete projects.vault[projects.currentProject][id];
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.new-todo');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    createTodo(
      document.querySelector('#title').value,
      document.querySelector('#description').value,
      document.querySelector('#date').value,
      document.querySelector('#prio').value,
      document.querySelector('#projectNumber').value,
    );
    hideTodoForm();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  createTodo('Title', 'description', '', '2', '0');
  createTodo('wash hands', 'before you eat at least', '', '7', '0');
  createTodo(
    'homework',
    'finish current odin project assignment',
    '',
    '9',
    '0',
  );
  createTodo(
    'look for a job',
    'get some interviews to find out what knowledge you are missing',
    '',
    '5',
    '0',
  );
});
export { createProject, switchToProject };

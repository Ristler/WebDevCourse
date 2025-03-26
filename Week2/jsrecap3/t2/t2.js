// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

let insert = document.querySelector("#ulList");

for(let i = 0; i < todoList.length; i++) {

  const lista = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");

  input.type = "checkbox";
  input.id = todoList[i].id;

  if(todoList[i].completed) {
    input.setAttribute("checked", "checked")
  } else {
    input.removeAttribute("checked");
  }

  label.setAttribute("for", input.id);
  label.textContent = todoList[i].task;

  lista.append(input, label);
  insert.appendChild(lista);
}


// add your code here

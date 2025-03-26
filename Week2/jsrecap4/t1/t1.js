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


console.log(todoList);

const insert = document.querySelector("ul");
const modal = document.querySelector("dialog");

const modalOpen = document.querySelector("#openModal");
const modalInput = document.querySelector("form input");


const addTaskBtn = document.querySelector("form button");


function mainApp() {



for(const todo of todoList) {
 
  const lista = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");

  const button = document.createElement("button");
  button.textContent = "Poista";

 

  input.type = "checkbox";
  input.id = todo.id


  
  if(todo.completed) {
    input.setAttribute("checked", "checked")
  } else {
    input.removeAttribute("checked");
  }
  label.setAttribute("for", input.id);
  label.textContent = todo.task;
  lista.append(input, label, button);
  insert.appendChild(lista);


  //CHECKBOX 
  input.addEventListener('click', function() {
  
    console.log(todo.task)
    if(todo.completed) {
      input.removeAttribute("checked", "checked");
      todo.completed = false;
    }
    else if(!todo.completed) {
      todo.completed = true;
    }
    console.log(todoList)
  })

  //POISTA NAPPI
  button.addEventListener('click', function(){
    console.log("painoit poista nappia");
    insert.removeChild(lista);
    todoList.pop(todo.id);
    console.log("päivitetty poisto,", todoList)

  })
}




  //AVAA MODAL
  modalOpen.addEventListener('click', function() {
    modal.showModal();
  })
}
  //LISÄÄ TASK 
  addTaskBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    const inputValue = modalInput.value;

    let task = {
      id: todoList.length + 1,
      task: inputValue,
      completed: false
    };

    todoList.push(task);
    console.log(todoList)
    modal.close();
    
    const lista = document.createElement("li");
    const input = document.createElement("input");
    const label = document.createElement("label");

    const button = document.createElement("button");
    button.textContent = "Poista";


    input.type = "checkbox";
    input.id = task.id;

    label.setAttribute("for", input.id);
    label.textContent = task.task;
    lista.append(input, label, button);
    insert.appendChild(lista);

  }
)
mainApp();
  



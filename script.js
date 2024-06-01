let pilih = document.getElementById("select");
let semua = document.getElementById("all");
let selesai = document.getElementById("selesai");
let pending = document.getElementById("belumselesai");
let add = document.getElementById("add");
let tanggal = document.getElementById("tanggal");
let lis = document.getElementById("listtas");
let list = document.getElementById("list");

let tasks = [];
function adds() {
  const tasktext = list.value.trim();
  const deadline = new Date(tanggal.value).toISOString();
  if (tasktext !== "") {
    const task = {
      id: Date.now().toString(),
      text: tasktext,
      deadline: deadline,
      completed: false,
    };
    tasks.push(task);
    saveTasksToLocalStorage();

    munculin();
    list.value = "";
    tanggal.value = "";
  }
}

function filteraja(params) {
  const pili = pilih.value;
  let yangudahdipilih = tasks;
  if (pili === "selesai") {
    yangudahdipilih = tasks.filter((task) => task.selesai);
  } else if (pili === "belum selesai") {
    yangudahdipilih = tasks.filter((task) => !task.selesai);
  }
  return yangudahdipilih;
}

function tooglecomplation(taskid) {
  tasks = tasks.map((task) =>
    task.id === taskid ? { ...task, completed: !task.completed } : task
  );
  saveTasksToLocalStorage();
  munculin();
}
function deletetask(taskid) {
  tasks = tasks.filter((task) => task.id !== taskid);
  saveTasksToLocalStorage();
  munculin();
}

function munculin() {
  const yangudahdipilih = taja();
  lis.innerHTML = "";
  yangudahdipilih.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = `<span class="task-task">${
      task.text
    }</span> <span class=""> deadline:${new Date(
      task.deadline
    ).toLocaleString()}</span>
    <div class=''>
    <button class='toogle-button'>${task.complet ? "undo" : "done"}</button>
    <button  class=''>Delete</button>
    </div>`;
    li.querySelector(".toogle-button").addEventListener("click", () => {
      tooglecomplation(task.id);
    });
    li.querySelector(".delete-button").addEventListener("click", () => {
      deletetask(task.id);
    });
    if (task.completed) {
      li.classList.add("completed");
    }
    lis.appendChild(li);
  });
}
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadtask(params) {
  const storedtask = localStorage.getItem("tasks");
  tasks = storedTaks ? JSON.parse(storedtask) : [];
}
filteraja.addEventListener("change", munculin);
loadtask();
munculin();
add.addEventListener("click", adds);

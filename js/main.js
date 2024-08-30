"use strict";

const submitBtn = document.querySelector("#submit-btn");
let inputText = document.querySelector("#input-text");
const taskContainer = document.querySelector(".task-container");
const taskListArray = [];
let editingTaskId = null;

submitBtn.addEventListener("click", function () {
  let input = inputText.value.trim();

  if (input === "") return;

  if (editingTaskId !== null) {
    const taskIndex = taskListArray.findIndex(
      (task) => task.id === editingTaskId
    );

    if (taskIndex !== -1) {
      taskListArray[taskIndex].input = input;
    }
    editingTaskId = null;

  } else {
    const dates = new Date();
    const taskTime = new Intl.DateTimeFormat("en-US").format(dates);

    const taskObj = {
      id: taskListArray.length + 1,
      input: input,
      taskTime: taskTime,
    };

    taskListArray.push(taskObj);
    console.log(taskListArray);
  }

  inputText.value = "";
  renderTask();
});

//render task
function renderTask() {
  taskContainer.innerHTML = "";

  taskListArray.forEach((task, i) => {
    const html = `
      <div
        class="mt-5 flex justify-between text-center px-10 font-semibold text-xl gap-10 task-list"
        data-id="${task.id}"
      >
        <p>${task.id}</p>
        <h3>${task.input}</h3>
        <p>${task.taskTime}</p>
        <p><i class="fa-solid fa-check"></i></p>
        <p><i class="fa-solid fa-trash delete-icon"></i></p>
        <p><i class="fa-solid fa-pen-to-square edit-icon"></i></p>
      </div>
    `;

    taskContainer.insertAdjacentHTML("beforeend", html);
  });
}

//delete task and edit task
taskContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-icon")) {
    const taskElement = e.target.closest(".task-list");
    const taskId = Number(taskElement.dataset.id);

    const taskIndex = taskListArray.find((task) => task.id === taskId);
    taskListArray.splice(taskIndex, 1);
    renderTask();
  }

  if (e.target.classList.contains("edit-icon")) {
    const taskElement = e.target.closest(".task-list");
    const taskId = Number(taskElement.dataset.id);

    const taskIndex = taskListArray.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      inputText.value = taskListArray[taskIndex].input;
      editingTaskId = taskId;
    }
  }
});

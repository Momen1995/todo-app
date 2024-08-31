"use strict";

const submitBtn = document.querySelector("#submit-btn");
let inputText = document.querySelector("#input-text");
const taskContainer = document.querySelector(".task-container");
const clearBtn = document.querySelector("#clear-all");
const totalTask = document.querySelector(".total-task");
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
    const taskDate = new Intl.DateTimeFormat("en-US").format(dates);
    const hour = dates.getHours();
    const minute = dates.getMinutes();
    const times = `${hour}:${minute}`;

    const taskObj = {
      id: taskListArray.length + 1,
      input: input,
      taskDate: taskDate,
      times: times,
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

  //total task
  let total = Number(totalTask.textContent);
  total += 1;
  totalTask.textContent = total;

  taskListArray.forEach((task, i) => {
    const html = `
      <div
        class="mt-5 flex justify-between items-center text-left  text-xl gap-10 task-list border-2 text-[#fff] bg-teal-800 py-2 px-3 rounded mb-5 w-8/12 mx-auto"
        data-id="${task.id}"
      >
        <div>
        <h3>${task.input}</h3>
        <p>${task.times}, ${task.taskDate}</p>
        </div>
        <p><i class="fa-solid fa-check"></i></p>
        <p><i class="fa-solid fa-trash delete-icon"></i></p>
        <p><i class="fa-solid fa-pen-to-square edit-icon mr-3"></i></p></div>
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


//clear all task
clearBtn.addEventListener("click", function () {
  taskListArray.splice(0);
  renderTask();
});

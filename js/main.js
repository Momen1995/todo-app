"use strict";

const submitBtn = document.querySelector("#submit-btn");
let inputText = document.querySelector("#input-text");
const taskContainer = document.querySelector(".task-container");
const clearBtn = document.querySelector("#clear-all");
const totalTask = document.querySelector(".total-task");
const completeTask = document.querySelector(".completed-task");
const pendingTask = document.querySelector(".pending-task");
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
      completed: false,
    };

    taskListArray.push(taskObj);
    console.log(taskListArray);
  }

  inputText.value = "";
  setTimeout(() => {
    renderTask();
  }, 1000);
});

// Render task
function renderTask() {
  taskContainer.innerHTML = "";

  // Update total and pending task counts
  totalTask.textContent = taskListArray.length;
  const completedCount = taskListArray.filter((task) => task.completed).length;
  completeTask.textContent = completedCount;
  pendingTask.textContent = taskListArray.length - completedCount;

  taskListArray.forEach((task) => {
    const html = `
      <div
        class=" text-left text-[16px] gap-10 task-list text-[#fff] bg-teal-800 rounded-xl mb-5 w-8/12 mx-auto "
        data-id="${task.id}"
      >
        <div>
          <h3 class="text-xl">${task.input}</h3>
          <p class="time-contain">${task.times}, ${task.taskDate}</p>
        </div>
        <p><i class="fa-solid fa-check complete-icon ${
          task.completed ? "icon-color" : ""
        }"></i></p>
        <p><i class="fa-solid fa-trash delete-icon"></i></p>
        <p><i class="fa-solid fa-pen-to-square edit-icon mr-3"></i></p>
      </div>
    `;

    taskContainer.insertAdjacentHTML("beforeend", html);
  });
}

// Delete task, edit task, and complete task event handler
taskContainer.addEventListener("click", function (e) {

  //delete task
  if (e.target.classList.contains("delete-icon")) {
    const taskElement = e.target.closest(".task-list");
    const taskId = Number(taskElement.dataset.id);
    const taskIndex = taskListArray.findIndex((task) => task.id === taskId);

    e.target.classList.add("pop-animation");
    setTimeout(() => {
      taskListArray.splice(taskIndex, 1);
      e.target.classList.remove("pop-animation");
      renderTask();
    }, 1000);
  }

  //edit task
  if (e.target.classList.contains("edit-icon")) {
    const taskElement = e.target.closest(".task-list");
    const taskId = Number(taskElement.dataset.id);
    const taskIndex = taskListArray.findIndex((task) => task.id === taskId);

    e.target.classList.add("pulse-animation");
    setTimeout(() => {
      if (taskIndex !== -1) {
        inputText.value = taskListArray[taskIndex].input;
        editingTaskId = taskId;
      }
      e.target.classList.remove("pulse-animation");
    }, 1000);
  }

  //complete task
  if (e.target.classList.contains("complete-icon")) {
    const taskElement = e.target.closest(".task-list");
    const taskId = Number(taskElement.dataset.id);

    const taskIndex = taskListArray.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1 && !taskListArray[taskIndex].completed) {
      taskListArray[taskIndex].completed = true;
      renderTask();
    }
  }
});

// Clear all tasks
clearBtn.addEventListener("click", function () {
  setTimeout(() => {
    taskListArray.splice(0);
    completeTask.textContent = 0;
    pendingTask.textContent = 0;
    renderTask();
  }, 1000);
});

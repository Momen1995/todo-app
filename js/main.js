"use strict";
const submitBtn = document.querySelector("#submit-btn");
let inputText = document.querySelector("#input-text");
const taskContainer = document.querySelector(".task-container");

const taskListArray = [];

submitBtn.addEventListener("click", function () {
  let input = inputText.value;
  const dates = new Date();
  const taskTime = new Intl.DateTimeFormat("en-US").format(dates);
  const taskObj = {
    input: input,
    taskTime: taskTime,
  };

  taskListArray.push(taskObj);
  console.log(taskListArray);
  inputText.value = "";

  renderTask();
});

function renderTask() {
  taskContainer.innerHTML = "";

  taskListArray.forEach((task, i) => {
    const html = `
      <div
        class="mt-5 flex justify-between text-center w-4/5 mx-auto font-semibold text-xl gap-10"
      >
        <p>${i + 1}</p>
        <h3>${task.input}</h3>
        <p>${task.taskTime}</p>
        <p><i class="fa-solid fa-check"></i></p>
        <p><i class="fa-solid fa-trash"></i></p>
        <p><i class="fa-solid fa-pen-to-square"></i></p>
      </div>
    `;

    taskContainer.insertAdjacentHTML("beforeend", html);
  });
}

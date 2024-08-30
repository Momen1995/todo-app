"use strict";
const submitBtn = document.querySelector("#submit-btn");
let inputText = document.querySelector("#input-text");

const taskListArray = [];

submitBtn.addEventListener("click", function () {
  let input = inputText.value;
  const taskObj = {
    taskId: taskListArray.length + 1,
    input: input,
  };

  taskListArray.push(taskObj);
  inputText.value = "";
});

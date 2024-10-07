let submit = document.getElementById("submit");
let todo = document.getElementById("todo");

function remove_task(element) {
  element.parentNode.removeChild(element);
}

async function mainfunc(task) {
  let store = document.getElementById("store");
  let div = document.createElement("div");
  div.classList.add("checkboxdiv");
  div.innerHTML = `
        <div>
            <input type="checkbox" name="checkbox" class="checkbox">
            <label for="checkbox" class="fonts">${task}</label>
        </div>
        <button class="remove-button">X</button>
    `;
  store.appendChild(div);

  let removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      remove_task(button.parentNode);
    });
  });
}

submit.addEventListener("click", () => {
  mainfunc(todo.value);
});

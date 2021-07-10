const form = document.querySelector("form");
const taskInput = document.querySelector("#newTask");
const submitButton = document.querySelector(".addButton");

const createHtmlElements = (input) => {
  const section = document.createElement("section");
  const wrapperDiv = document.createElement("div");
  const taskDiv = document.createElement("div");
  const taskContent = document.createElement("p");
  const button = document.createElement("button");
  const buttonIcon = document.createElement("i");

  section.classList.add("displayTodo");
  wrapperDiv.classList.add("wrapper");
  taskDiv.classList.add("taskInput");
  taskContent.classList.add("taskText");
  buttonIcon.classList.add("fas", "fa-check");
  button.classList.add("checkButton");
  taskContent.innerText = input;

  button.appendChild(buttonIcon);
  taskDiv.appendChild(taskContent);
  wrapperDiv.appendChild(taskDiv);
  wrapperDiv.appendChild(button);
  section.appendChild(wrapperDiv);
  document.body.appendChild(section);
};

for (let item = 0; item < localStorage.length; item++) {
  let key = localStorage.key(item);
  createHtmlElements(key);
}

form.addEventListener("submit", (e) => {
  if (taskInput.value === "") {
    e.preventDefault();
    taskInput.classList.add("invalidInput");
    return false;
  }
  taskInput.classList.remove("invalidInput");
  e.preventDefault();

  createHtmlElements(taskInput.value);

  window.localStorage.setItem(taskInput.value, taskInput.value);
  taskInput.value = "";
});

document.addEventListener("click", (e) => {
  const selectors = [".checkButton", ".fa-check"];
  const element = e.target;
  if (element.matches(selectors[0])) {
    const sectionToRemove = e.path[2];
    const wrapperDiv = e.path[1];
    wrapperDiv.classList.add("removeTask");
    wrapperDiv.addEventListener("animationend", () => {
      sectionToRemove.remove();
      const taskName = e.path[1].childNodes[0].childNodes[0].innerText;
      window.localStorage.removeItem(taskName);
    });
  } else if (element.matches(selectors[1])) {
    const sectionToRemove = e.path[3];
    const wrapperDiv = e.path[2];
    wrapperDiv.classList.add("removeTask");
    wrapperDiv.addEventListener("animationend", () => {
      sectionToRemove.remove();
      const taskName = e.path[2].childNodes[0].childNodes[0].innerText;
      window.localStorage.removeItem(taskName);
    });
  }
});

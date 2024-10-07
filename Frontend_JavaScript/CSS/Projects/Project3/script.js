const container = document.querySelector(".my-container");
const align = ["center", "start", "end"];
for (let i = 0; i <= 100; i++) {
  let element = document.createElement("div");
  element.classList.add("box");
  let number = Math.floor(Math.random() * 30);
  let alignment = align[Math.floor(Math.random() * 3)];
  if (number === 0) continue; // This will skip the iteration if number is 0
  let width_number = Math.floor(Math.random() * (30 - 5)) + 5;
  element.style.setProperty("--i", number);
  element.style.setProperty("z-index", number);
  element.style.setProperty("height", `${number}vh`);
  element.style.setProperty("width", `${width_number}vw`);
  element.style.setProperty("align-self", alignment);
  container.prepend(element);
}

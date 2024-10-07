const qna = [
  [
    "1. What is the capital of India",
    "Delhi",
    "Berlin",
    "Washington DC",
    "Islamabad",
  ],
  [
    "2. What is the capital of Nepal",
    "Kathmandu",
    "Berlin",
    "Washington DC",
    "Islamabad",
  ],
];
function check(clicked, correct) {
  if (clicked == correct) {
    clicked.classList.add("bg-success");
  } else {
    correct.classList.add("bg-success");
    clicked.classList.add("bg-danger");
  }
}
async function shuffleArray(arr) {
  const shuffledArr = arr.slice();
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
  return shuffledArr;
}

let i = 0;
const btn = document.querySelector(".btn");
btn.innerHTML = "Begin";
btn.addEventListener("click", () => {
  btn.classList.add("d-none");
  let main = document.querySelector("#main");
  main.innerHTML = "";
  i++;
  btn.innerHTML = "Next";
  let collection = qna[i - 1];
  let answer = collection[1];
  let question = collection[0];
  let options = [collection[1], collection[2], collection[3], collection[4]];
  main.innerHTML = `<div id="question" class="row mx-1 my-3 fs-3">${question}</div>`;
  shuffleArray(options).then((shuffledOptions) => {
    shuffledOptions.forEach((option) => {
      main.innerHTML += `<div class="options row rounded mx-1 my-3 p-2">${option}</div>`;
    });
    document.querySelectorAll(".options").forEach((element) => {
      element.addEventListener("click", () => {
        check(element, answer);
      });
    });
  });
});

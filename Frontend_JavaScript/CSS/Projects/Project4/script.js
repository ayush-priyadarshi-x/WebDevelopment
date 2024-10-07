// let btn = document.querySelector(".btn");
let deleteMessage = document.querySelector(".delete");
// btn.addEventListener("click", () => {
// });
document.querySelector(".btn").addEventListener("click", function () {
  deleteMessage.classList.add("message");
  this.classList.toggle("rotate");
});

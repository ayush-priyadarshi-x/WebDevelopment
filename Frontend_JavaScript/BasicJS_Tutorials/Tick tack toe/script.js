const items = document.querySelectorAll(".container .gamebox .item");
let win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function determine(x) {
  if (x === true) {
    console.log(`X won`);
  } else {
    console.log(`X lost`);
  }
}
async function check() {
  win.forEach(function (elements) {
    if (
      items[elements[0]].innerHTML == items[elements[1]].innerHTML &&
      items[elements[1]].innerHTML == items[elements[2]].innerHTML &&
      items[elements[2]].innerHTML == "X"
    ) {
      determine(true);
    } else if (
      items[elements[0]].innerHTML == items[elements[1]].innerHTML &&
      items[elements[1]].innerHTML == items[elements[2]].innerHTML &&
      items[elements[2]].innerHTML == "O"
    ) {
      determine(false);
    }
  });
}
async function mainfunc(a, b) {
  if (a % 2 != 0) {
    b.innerHTML = "X";
  } else {
    b.innerHTML = "O";
  }
  await check();
}
let x = 0;
items.forEach(function (box) {
  box.addEventListener("click", function () {
    ++x;
    mainfunc(x, box);
  });
});

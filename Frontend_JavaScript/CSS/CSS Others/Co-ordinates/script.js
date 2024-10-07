const box = document.querySelector(".main");

box.addEventListener("mousedown", (event) => {
  let placex = event.clientX;
  let placey = event.clientY;

  box.addEventListener("mouseup", (event) => {
    let second_placex = event.clientX;
    let second_placey = event.clientY;
    let distance =
      (Math.sqrt(
        (second_placex - placex) ** 2 + (second_placey - placey) ** 2
      ) /
        window.innerWidth) *
      100;

    // Adjust the background position based on the calculated distance
    box.style.backgroundPositionX = `${distance}%`; // Adjust horizontal position
    box.style.backgroundPositionY = `${distance}%`; // Adjust vertical position
  });
});

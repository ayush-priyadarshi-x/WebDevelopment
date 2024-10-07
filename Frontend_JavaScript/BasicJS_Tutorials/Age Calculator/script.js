const calculate = document.getElementById("calculate");
const input = document.getElementById("birthdate");

// Set the maximum allowed date to the current date
input.max = new Date().toISOString().split("T")[0];

const mainfunc = () => {
  // Get the birthdate from the input field
  let birthdate = new Date(input.value);

  // Extract day, month, and year from the birthdate
  let d1 = birthdate.getDate();
  let m1 = birthdate.getMonth() + 1;
  let y1 = birthdate.getFullYear();

  // Get the current date
  let today = new Date();

  // Extract day, month, and year from the current date
  let d2 = today.getDate();
  let m2 = today.getMonth() + 1;
  let y2 = today.getFullYear();

  // Calculate the person's age
  let y3 = y2 - y1;
  let m3, d3;

  if (m2 >= m1) {
    m3 = m2 - m1;
  } else {
    y3--;
    m3 = 12 + m2 - m1;
  }

  if (d2 >= d1) {
    d3 = d2 - d1;
  } else {
    m3--;
    d3 = 30 + d2 - d1; // Consider handling varying month lengths more accurately
  }

  // Create a message element to display the age
  let message = document.createElement("div");
  message.id = "message";
  // Get the container element
  let container = document.querySelector(".container");

  // Append the message element to the container
  container.appendChild(message);

  // Set the content of the message element to display the calculated age
  message.innerHTML = `The person's age is ${y3} years, ${m3} months, and ${d3} days`;
};

// Attach an event listener to the calculate button
calculate.addEventListener("click", () => {
  mainfunc(); // Call the main function when the button is clicked
});

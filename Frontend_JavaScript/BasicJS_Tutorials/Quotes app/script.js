const container = document.querySelector(".container");

const check = (x, y, z) => {
  const operatorsElement = document.querySelector(".operators");
  if (x === true) {
    operatorsElement.innerHTML = `
      <p class='garamond quote'>"${y}"</p>
      <h4 class='garamond person'>-${z}</h4>
    `;
  } else {
    const alert = document.createElement("div");
    alert.classList.add("alert", "alert-primary");
    alert.innerHTML = `
      <p>The quote couldn't be generated.</p>
      <button class="delete-btn">X</button>
    `;
    container.prepend(alert);
  }
};
const tweet = (quote, author) => {
  document.querySelector(".tweet").addEventListener("click", () => {
    window.open(
      "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(quote + " --" + author),
      "Tweet window",
      "width=600,height=300"
    );
  });
};

const fetchQuote = async () => {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    const { content, author } = data;
    check(true, content, author);
    tweet(content, author);
  } catch (error) {
    check(false, null, null);
  }
};

const mainfunc = async () => {
  await fetchQuote();
};

document.addEventListener("DOMContentLoaded", function () {
  fetchQuote();
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    event.target.closest(".alert").remove();
  }
});

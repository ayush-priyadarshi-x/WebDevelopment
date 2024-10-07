const createButton = () => {
  const button = document.createElement("button");
  button.classList.add("btn", "btn-primary", "myfonts");
  button.setAttribute("type", "button");
  button.setAttribute("id", "button-addon2");
  button.innerText = "Generate QR";
  const inputSection = document.querySelector(".inputsection");
  inputSection.appendChild(button);
};
createButton();
const generate = async (x, y) => {
  try {
    if (x === true) {
      const response = await fetch(
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + y
      );
      const qrData = await response.blob();
      document.getElementById("img").src = URL.createObjectURL(qrData);
    }
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
};

const mainfunc = async () => {
  try {
    const inputbox = document.querySelector(".inputsection input");
    const url = inputbox.value;
    const response = await fetch(
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + url
    );
    if (response.ok) {
      generate(true, url);
    } else {
      throw new Error("Failed to fetch QR code");
    }
  } catch (error) {
    console.error("Error generating QR code:", error);
    generate(false);
  }
};

const button = document.querySelector(".inputsection button");
button.addEventListener("click", () => {
  mainfunc();
});

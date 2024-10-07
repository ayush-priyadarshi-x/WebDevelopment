import { useState, useEffect } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    try {
      if (input) {
        setAnswer(eval(input));
      }
    } catch (error) {
      console.log(error);
    }
  }, [input]);

  const handleOnButtonClick = (e) => {
    const value = e.target.innerHTML;

    if (value === "C") {
      // Clear input and answer
      setInput("");
      setAnswer("");
    } else if (value === "<") {
      // Remove the last character from input
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      setInput(answer); // Set input to answer after "=" is clicked
    } else {
      setInput(input + value); // Add new input character
    }
  };

  const buttons = "C<%/789*456-123+0.=".split("");

  return (
    <>
      <div className="py-5 px-3 ship-officer rounded">
        <div className="mb-3 bg-light rounded">
          <textarea
            className="form-control bg-transparent border-0"
            rows="3"
            readOnly
            value={input} // Bind value to input state
          />
          <div id="answers p-2" style={{ height: "20px" }} className="border-0">
            <p className="fw-bold">{answer}</p>
          </div>
        </div>
        <div className="button-grid">
          {buttons.map((button, index) => {
            let newInd = index + 1;
            let btnType = { size: 1, color: "btn-dark" };
            if (newInd <= 3) {
              btnType.color = "btn-secondary";
            } else if (newInd % 4 === 0) {
              btnType.color = "btn-orange";
            } else if (button === "0") {
              btnType.size = 2;
            }

            return (
              <button
                onClick={handleOnButtonClick}
                key={index}
                className={`btn btn-primary btn-grid-area-${btnType.size} rounded-pill ${btnType.color}`}
              >
                {button}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Calculator;

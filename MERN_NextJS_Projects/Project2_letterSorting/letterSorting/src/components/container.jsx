import React, { useState, useEffect } from "react";

const Container = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);

  const handleOnSave = async (e) => {
    const newArr = [inputValue, ...data];
    await setData(newArr.sort());
    setInputValue("");
  };

  const handleOnEnter = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleOnSave();
    }
  };

  const handleOnInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnClose = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <>
      <div
        className="container-fluid bg-secondary d-flex flex-column p-5"
        style={{ height: "100vh" }}
      >
        <div className="row">
          <div className="offset-3 col-6">
            <div className="input-group mb-3">
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon1"
                onClick={handleOnSave}
              >
                Enter
              </button>
              <input
                onChange={handleOnInputChange}
                onKeyDown={handleOnEnter}
                value={inputValue}
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
            </div>
          </div>
        </div>
        {data.length > 0 && (
          <div className="table bg-secondary text-dark">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S.N.</th>
                  <th scope="col">Word</th>
                  <th scope="col">Close</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{element}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleOnClose(index)}
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Container;

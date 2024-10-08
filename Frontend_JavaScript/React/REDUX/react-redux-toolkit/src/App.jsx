import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  reset, // Assuming this action exists
  incrementByAmount,
} from "./features/counter/counter";
import { useRef } from "react";

function App() {
  const amountRef = useRef(); // Renamed the ref variable to avoid name conflict
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);

  return (
    <>
      <div
        className="bg-dark container-fluid p-3 d-flex justify-content-center align-items-center gap-5"
        style={{ width: "100%", height: "100%" }}
      >
        <div>
          <button
            className="btn btn-lg btn-secondary"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
          <p className="fw-bold fs-1 text-light">Counter: {counter}</p>
          <button
            className="btn btn-lg btn-secondary"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
        </div>
        <button
          onClick={() => dispatch(reset())} // Reset action assuming you have it in your slice
          className="btn btn-lg btn-danger"
        >
          Reset
        </button>
        <div>
          <button
            className="btn btn-secondary my-5 btn-lg"
            onClick={() =>
              dispatch(incrementByAmount(Number(amountRef.current.value)))
            } // Convert input to number
          >
            Increment by Amount
          </button>
          <input ref={amountRef} type="number" className="form-control" />
        </div>
      </div>
    </>
  );
}

export default App;

import Calculator from "./calculator";

const main = () => {
  return (
    <>
      <div className="container-fluid falling-star p-5">
        <div className="row">
          <div className="col-4 offset-4">
            <Calculator />
          </div>
        </div>
      </div>
    </>
  );
};

export default main;

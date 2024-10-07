import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await delay(2);
    console.log(data);
  };
  return (
    <>
      <div className="container">
        <form action="/" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              className="btn btn-outline-primary rounded btn-sm"
              type="submit"
              value="submit"
              disabled={isSubmitting}
            />
            <div className="mx-3">
              <input
                {...register("firstName", {
                  required: { value: true, message: "The Field is required." },
                  minLength: {
                    value: 3,
                    message: "Minimum Length should be 3",
                  },
                  maxLength: { value: 8, message: "Max Length is 8." },
                })}
                type="text"
                aria-label="First name"
                className="form-control"
              />
              {errors.firstName && (
                <div className="text-danger fs-6">
                  {errors.firstName.message}
                </div>
              )}
              <input
                {...register("lastName", {
                  required: { value: true, message: "The Field is required." },
                  minLength: {
                    value: 3,
                    message: "Minimum Length should be 3",
                  },
                  maxLength: { value: 8, message: "Max Length is 8." },
                })}
                type="password"
                aria-label="Last name"
                className="form-control"
              />
              {errors.lastName && (
                <div className="text-danger fs-6">
                  {errors.lastName.message}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;

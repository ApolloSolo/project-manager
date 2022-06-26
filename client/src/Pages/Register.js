import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { REGISTER } from "../utils/mutations";
import Auth from "../utils/auth";

const Register = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [register, { error }] = useMutation(REGISTER, { errorPolicy: "all" });
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await register({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
          confirmPassword: formState.confirmPassword,
        },
      });
      if (response.errors) {
        setErrors(response.errors[0].extensions.errors);
      }
      const token = response.data.register.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  return (
    <div className="flex flex-col items-center mt-12 border border-[#30cad5] rounded-sm mx-2 md:mx-10 p-2 bg-[#3b3b3b]">
      <h1 className="text-center text-4xl text-[#30cad5] mt-3">Register</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center w-[60%] min-w-[325px] mt-8"
      >
        <div className="mb-3 pt-0 w-full">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="px-3 py-3 placeholder-slate-600 text-slate-900 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            onChange={handleChange}
          />
        </div>

        <div className="my-6 pt-0 w-full">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-3 py-3 placeholder-slate-600 text-slate-900 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            onChange={handleChange}
          />
        </div>
        <div className="my-6 pt-0 w-full">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-3 py-3 placeholder-slate-600 text-slate-900 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            onChange={handleChange}
          />
        </div>
        <div className="my-6 pt-0 w-full">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="px-3 py-3 placeholder-slate-600 text-slate-900 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button
            className="text-white border-2 hover:bg-[#3faec1] hover:border-[#3faec1] px-4 py-3 my-8 mx-auto flex items-center duration-300"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="h-75px text-[#991111] text-xl mt-8 text-center">
          <ul className="">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Register;

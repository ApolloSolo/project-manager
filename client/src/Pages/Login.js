import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  if (error) {
    console.log("This is an error: " + error);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({
        variables: { email: formState.email, password: formState.password },
      });
      console.log("Response object " + response);
      const token = response.data.login.token;
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
  };

  return (
    <div className="flex flex-col items-center mt-12 border border-[#30cad5] rounded-sm mx-2 md:mx-10 p-2 bg-[#3b3b3b]">
      <h1 className="text-center text-4xl text-[#30cad5]">Login</h1>
      <form onSubmit={handleFormSubmit} className="w-[60%] min-w-[325px] mt-4">
        <div className="mb-3 pt-0">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-3 py-3 placeholder-slate-600 text-slate-900 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 pt-0">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-3 py-3 placeholder-slate-600 text-slate-900 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center h-20 mx-auto px-4 text-white">
      <div className="flex items-center">
        <div className="flex flex-col text-center">
          <h1 className="w-full text-3xl font-bold text-[#00df9a]">
            Manage
          </h1>
          <h1 className="w-full text-3xl font-bold text-[#00df9a]">
            - It -
          </h1>
        </div>
        <ul className="flex">
          <li className="p-4">Home</li>
          <li className="p-4">Clients</li>
          <li className="p-4">Projects</li>
        </ul>
      </div>
      <div>
        <ul className="flex">
          <li className="p-4">Login</li>
          <li className="p-4">Logout</li>
          <li className="p-4">Register</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

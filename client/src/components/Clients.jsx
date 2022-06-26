import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../utils/queries";
import Auth from "../utils/auth";

const Clients = () => {
  const userProfile = Auth.getProfile();

  const { loading, data } = useQuery(ME);
  const userData = data?.me || [];

  //console.log(userData.clients.projects);
  return (
    <div className="text-[#EEE] flex flex-col items-center">
      <h1>Dashboard</h1>
      {loading ? (
        <div>LOADING...</div>
      ) : (
        <div className="flex">
          {userData.clients.map((client) => (
            <div className="mx-4" key={client._id}>
              <h2>{client.name}</h2>
              <ul>
                {client.projects.map((project) => (
                  <li key={project._id}>{project.siteId}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;

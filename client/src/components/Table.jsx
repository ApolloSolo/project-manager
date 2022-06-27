import React from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../utils/queries";
import ProjectRow from "./ProjectRow";
import Auth from "../utils/auth";

const Table = () => {
  const { loading, error, data } = useQuery(ME);
  const userData = data?.me || [];

  if (error) return <p>Somthing Went Wrong</p>;

  return (
    <table className="">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {/* <ProjectRow key={projectID} project={project}/> */}
      </tbody>
    </table>
  );
};

export default Table;

import React, { createContext, useContext } from "react";

// Initialize new context
const ClientContext = createContext();

// Create a custome hook to provide imediate usage of the context

export const useStudentContext = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const initState = {
    clients: [
      {
        client: "Bank of America",
        manager: "matt.teixeira@gmail.com",
        projects: [
          {
            siteID: "NC1-030",
          },
        ],
      },
    ],
  };

  return (
    <ClientContext value={children}>

    </ClientContext>
  )

};

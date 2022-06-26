const { gql } = require("@apollo/client");

export const QUERY_CLIENTS = gql`
  query getClients {
    getClients {
      _id
      name
      manager
      projects {
        siteId
        subContractor
        assets {
          asset
          volume
        }
      }
    }
  }
`;

export const ME = gql`
  {
    me {
      _id
      username
      email
      clients {
        _id
        name
        manager
        projects {
          _id
          siteId
        }
      }
    }
  }
`;

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    clients: [Client]
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Client {
    _id: ID!
    name: String!
    projects: [Project]
    manager: String!
  }

  type Asset {
    asset: String!
    volume: Int!
  }

  type Project {
    _id: ID
    siteId: String
    subContractor: String
    assets: [Asset]
  }

  type Query {
    me: User!
    getUsers: [User]
    getClients: [Client]
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): Auth!
    login(email: String!, password: String!): Auth!
    addClient(managerEmail: String! clientName: String!): Client!
    updateClientManager(managerEmail: String!, clientName: String!): Client!
    addProject(clientName: String!, siteId: String!, subContractor: String!): Client!
    addAsset(siteId: String!, asset: String!, volume: Int!): Project!
  }
`;

module.exports = typeDefs;

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
    manager: [User]
  }

  type Project {
    _id: ID
    siteId: String
    subContractor: String
    client: Client
  }

  type Query {
    me: User!
    getUsers: [User]!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): Auth!
    login(email: String!, password: String!): Auth!
  }
`;

module.exports = typeDefs;

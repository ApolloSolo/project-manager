const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        clients: [Client]
    }

    type Client {
        _id: ID
        projects: [Project]
        manager: [User]
    }

    type Project {
        _id: ID
        siteId: String,
        subContractor: String
        client: Client 
    }

    type Query {
        getUsers: [User]
    }

    type Mutation {
        register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
    }
`;

module.exports = typeDefs;
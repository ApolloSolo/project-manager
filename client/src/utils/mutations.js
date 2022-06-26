import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REGISTER = gql`
mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!){
  register(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;
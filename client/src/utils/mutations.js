import { gql } from "@apollo/client";
// mutations

// create the user/ signup
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
// login user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
// edit user info
export const EDIT_USER = gql`
  mutation editUser(
    $firstName: String!
    $lastName: String!
    $pokemon: String!
    $heldItem: String!
    $berry: String!
    $bio: String!
  ) {
    editUser(
      firstName: $firstName
      lastName: $lastName
      pokemon: $pokemon
      heldItem: $heldItem
      berry: $berry
      bio: $bio
    ) {
      token
      user {
        userName
        _id
        firstName
        lastName
        pokemon {
          name
          type
        }
        heldItem
        berry
        bio
      }
    }
  }
`;
// // add a match to matches array?
// export const ADD_MATCH = gql``;
// // delete match from matches array
// export const REMOVE_MATCH = gql``;

// // instant messaging function??? for now leave comments on a page that only the author and page owner can see. a back and forth comment box....
// export const ADD_IM =gql``

// export const REMOVE_IM =gql``

// potential donations angle??

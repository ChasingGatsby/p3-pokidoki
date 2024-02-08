import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query getProfile ($id: ID!) {
    getProfile( where :(_id: $id)) {
      _id
      firstName
      lastName
      userName
      email
      bio
      pokemon {
        name
        type
        image
      }
      berry
      heldItem
      matches {
        name
        image
      }
    }
  }
`;

export const GET_ALL_PROFILES = gql`
  query getAllProfiles {
    getAllProfiles {
      _id
      firstName
      lastName
      userName
      email
      bio
      pokemon {
        name
        type
        image
      }
      berry
      heldItem
    
    }
  }
`;

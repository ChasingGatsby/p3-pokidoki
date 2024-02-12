import { gql } from "@apollo/client";

export const GET_OWN_PROFILE = gql`
  query getOwnProfile($id: ID!) {
    getOwnProfile(_id: $id) {
      _id
      firstName
      lastName
      username
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
        firstName
        lastName
        image
      }
    }
  }
`;

export const GET_OTHER_PROFILE = gql`
  query getOtherProfile($id: ID!) {
    getOtherProfile(_id: $id) {
      _id
      firstName
      lastName
      username
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
        firstName
        lastName
        image
      }
    }
  }
`;

export const GET_PROFILES_BY_POKEMON = gql`
  query getProfilesByPokemon($name: String!) {
    getProfilesByPokemon(name: $name) {
      _id
      firstName
      lastName
      username
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

export const GET_PROFILES_BY_TYPE = gql`
  query getProfilesByType($type: String!) {
    getProfilesByType(type: $type) {
      _id
      firstName
      lastName
      username
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

export const GET_ALL_PROFILES = gql`
  query getAllProfiles {
    getAllProfiles {
      _id
      firstName
      lastName
      username
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

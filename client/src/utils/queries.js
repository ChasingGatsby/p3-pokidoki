import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query getProfile {
    getProfile {
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
        firstName
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

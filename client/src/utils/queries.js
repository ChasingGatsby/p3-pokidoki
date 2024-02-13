import { gql } from "@apollo/client";

export const GET_OWN_PROFILE = gql`
  query getOwnProfile {
    getOwnProfile {
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
        lastName

        userName
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

export const GET_PROFILES_BY_TYPE = gql`
  query getProfilesByType($type: String!) {
    getProfilesByType(type: $type) {
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
export const GET_MATCHES = gql`
  query getMatches {
    getMatches {
      userName

      firstName
      lastName
      matches {
        _id
        firstName
        lastName
        userName
      }
    }
  }
`;

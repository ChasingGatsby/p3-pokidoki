// need to add everything we need for our user typedef

const typeDefs = `
type Pokemon {
  name: String
  type: [String]
  image: String
}

type Match {
  firstName: String
  lastName: String
  image: String
}

type Users {
  _id: ID
  firstName: String
  lastName: String
  username: String
  email: String
  bio: String
  pokemon: Pokemon
  berry: String
  heldItem: String
}

type Profile {
  _id: ID
  firstName: String
  lastName: String
  username: String
  email: String
  bio: String
  pokemon: [Pokemon]
  berry: String
  heldItem: String
}

type Auth {
  token: ID!
  user: Profile
}

type Query {
  getProfile: Profile
  getAllProfiles: [Users]
  getProfilesByPokemon(name: String!): [Users]
  getProfilesByType(type: String!): [Users]
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;

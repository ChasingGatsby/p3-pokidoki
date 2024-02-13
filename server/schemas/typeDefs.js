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

type Message {
  from: String
  to: String
  text: String
  date: String
}

type Users {
  _id: ID
  firstName: String
  lastName: String
  userName: String
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
  userName: String
  email: String
  bio: String
  pokemon: Pokemon
  berry: String
  heldItem: String
  matches: [Match]

}

type Auth {
  token: ID!
  user: Profile
}

type Query {
  getOwnProfile: Profile
  getOtherProfile(_id: ID!): Profile
  getAllProfiles: [Users]
  getProfilesByPokemon(name: String!): [Users]
  getProfilesByType(type: String!): [Users]
}

type Mutation {
  addUser(userName: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  editUser(firstName: String!, lastName: String!, pokemon: String!, heldItem: String!, berry: String!, bio: String!, ) : Auth 
  sendMessage(to: String!, text: String!): Message
}
`;

module.exports = typeDefs;

// test comment

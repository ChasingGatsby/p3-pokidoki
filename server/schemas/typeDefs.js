// need to add everything we need for our user typedef
const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    
},
type Query {
    users: [User]
    user(id: ID!): User
  }`;

module.exports = typeDefs;

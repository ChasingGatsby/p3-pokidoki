// need to add everything we need for our resolvers. our queries and mutations
const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    getAllProfiles: async () => {
      return await User.find({});
    },
    getProfile: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
    },
    getProfilesByPokemon: async (parent, { name } ) => {
      console.log(name);
     const results = await User.find({ "pokemon.name": name })
      console.log(results)
      return results ;
    },
    getProfilesByType: async (parent, { type }) => {
      return await User.find({ type: { $in: [type] } });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;

// new comment for testing

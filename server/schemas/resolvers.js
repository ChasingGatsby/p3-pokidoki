// need to add everything we need for our resolvers. our queries and mutations
const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    getAllProfiles: async () => {
      return await User.find({});
    },
    getOwnProfile: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
    },
    getOtherProfile: async (_, { _id }, context) => {
      return await User.findById(_id);
    },
    getProfilesByPokemon: async (parent, { name }) => {
      const results = await User.find({ "pokemon.name": name });
      return results;
    },
    getProfilesByType: async (parent, { type }) => {
      const results = await User.find({ "pokemon.type": { $in: [type] } });
      console.log(results);
      return results;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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
    editUser: async (
      parent,
      { firstName, lastName, pokemon, heldItem, berry, bio },
      context
    ) => {
      // Find the user by _id
      const user = await User.findById({ _id: context.user._id });
      console.log(`this is context.user.......`, context.user);
      console.log(`this is the user`, user);
      // Check if the user exists
      if (!user) {
        throw new Error("User not found");
      }

      // Update the user with the new information
      user.firstName = firstName;
      user.lastName = lastName;
      user.pokemon = pokemon;
      user.heldItem = heldItem;
      user.berry = berry;
      user.bio = bio;

      // If a profile picture was uploaded, save it to the user's profile
      // if (profilePic) {
      //   user.profilePic = profilePic;
      // }

      // Save the updated user to the database
      const updatedUser = await user.save();

      // Return the updated user and a new token
      return {
        token: signToken(user),
        user: updatedUser,
      };
    },
  },
};

module.exports = resolvers;

// new comment for testing

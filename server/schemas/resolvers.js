// need to add everything we need for our resolvers. our queries and mutations
const { User, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    getAllProfiles: async () => {
      return await User.find({});
    },
    getOwnProfile: async (parent, args, context) => {
      if (context.user) {
        return await User.findById({ _id: context.user._id });
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
    getMatches: async (parent, args, context) => {
      const currentUser = context.user;
      const populatedUser = await User.findById(currentUser._id).populate(
        "matches"
      );
      return populatedUser;
    },
  },

  Mutation: {
    addMatch: async (parent, { userName }, context) => {
      const newMatch = await User.findOne({ userName: userName });
      console.log(newMatch);
      const currentUser = context.user;
      const updatedUser = await User.findByIdAndUpdate(
        currentUser._id,
        { $addToSet: { matches: newMatch._id } },
        { new: true }
      );

      console.log("this is current", currentUser);
      console.log("this is updated user", updatedUser);
      return updatedUser;
      // Check if the user exists
    },

    addUser: async (parent, { userName, email, password }) => {
      const user = await User.create({ userName, email, password });
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

      // Check if the user exists
      if (!user) {
        throw new Error("User not found");
      }
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const data = await response.json();
      const typeData = data.types[0].type.name;
      // Update the user with the new information
      user.firstName = firstName;
      user.lastName = lastName;
      user.pokemon.name = pokemon;
      user.pokemon.type = typeData;
      user.pokemon.image = `https://img.pokemondb.net/artwork/large/${pokemon}.jpg`;
      user.heldItem = heldItem;
      user.berry = berry;
      user.bio = bio;

      // If a profile picture was uploaded, save it to the user's profile
      // if (profilePic) {
      //   user.profilePic = profilePic;
      // }

      // Save the updated user to the database
      const updatedUser = await user.save();
      console.log(`this is the user`, user);
      // Return the updated user and a new token
      return {
        token: signToken(user),
        user: updatedUser,
      };
    },
    sendMessage: async (_, { to, text }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new Error("You must be logged in to send a message.");
      }

      // Create a new message
      const message = new Message({
        from: context.user._id,
        to,
        text,
        date: new Date().toISOString(),
      });

      // Save the message to the database
      const savedMessage = await message.save();

      return savedMessage;
    },
  },
};
module.exports = resolvers;

// new comment for testing

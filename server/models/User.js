const { Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
  },
  pokemon: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  berry: {
    type: String,
  },
  heldItem: {
    type: String,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  matches: {
    type: [Schema.Types.ObjectId],
    ref: "Match",
  },
});

module.exports = userSchema;

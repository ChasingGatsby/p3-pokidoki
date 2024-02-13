const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const messageSchema = require("./Message");

const userSchema = new Schema({
  firstName: {
    type: String,

    trim: true,
  },
  lastName: {
    type: String,

    trim: true,
  },
  userName: {
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
    },
    type: {
      type: [String],
    },
    image: {
      type: String,
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
    get: (timestamp) => dateFormat(timestamp),
  },
  matches: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  sentMessages: [messageSchema],
  receivedMessages: [messageSchema],
  profilePic: {
    type: String,
    default: "/default-profile-pic.jpg",
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;

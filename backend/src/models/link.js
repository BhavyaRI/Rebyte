const mongoose = require("mongoose");
const counter = require("../utils/counterService");

const linkSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true,
    trim: true,
  },

  shortCode: {
    type: String,
    required: true,
    unique: true,
  },

  clickCount: {
    type: Number,
    default: 0,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userAccount",
    required: true,
  },
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;

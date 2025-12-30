const mongoose = require("mongoose");
const counterService = require("../utils/counterService");
const Link = require("../models/link"); 
const encode = require("../utils/base62"); 
const { nanoid } = require("nanoid");

const short = async (req, res) => {
  try {
    let { originalURL } = req.body;
    let shortCode;
    let existLink;
    do {
      shortCode = nanoid(7);
      existLink = await Link.findOne({ shortCode: shortCode });
    } while (existLink);
    const userId = req.user._id;
    if (!/^https?:\/\//i.test(originalURL)) {
      originalURL = "https://" + originalURL;
    }
    const newLink = new Link({
      userId: userId,
      originalURL: originalURL,
      shortCode: shortCode,
    });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getAllLinks = async (req, res) => {
  try {
    const userId = req.user._id;
    const links = await Link.find({ userId: userId }).sort({ createdAt: -1 });
    return res.status(200).json(links);
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

const deleteLink = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Link.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(400).json({
        message: "Invalid LinkID",
      });
    }
    return res.status(200).json({
      message: "link deletion successful",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  short,
  getAllLinks,
  deleteLink,
};

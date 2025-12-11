const mongoose = require("mongoose");
const counterService = require("../utils/counterService");
const Link = require("../models/link"); // <-- CHANGED to CommonJS 'require'
const encode = require("../utils/base62"); // <-- CHANGED to CommonJS 'require'
const Counter = require("../models/counter");
const {nanoid} = require("nanoid");

const short = async (req, res) => {
  try {
    let { originalURL } = req.body;
    /* const newID = await counterService.nextSequence("LinkID");
    const shortCode = encode(newID); */
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

    const shortUrl = `http://localhost:3000/${shortCode}`;
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
    return res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const deleteLink = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Link.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(400).json({
        message: "invalid linkID",
      });
    }
    return res.status(200).json({
      message: "link deletion successful",
    });
  } catch (error) {
    return res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

module.exports = {
  short,
  getAllLinks,
  deleteLink,
};

const mongoose = require('mongoose');
const counterService = require('../utils/counterService');
const Link = require('../models/link'); // <-- CHANGED to CommonJS 'require'
const encode = require('../utils/base62'); // <-- CHANGED to CommonJS 'require'
const Counter = require('../models/counter');

const short = async (req, res) => {
    try {
        const { originalURL } = req.body;
        const newID = await counterService.nextSequence("LinkID");
        const shortCode = encode(newID);
        const userId = req.user._id;


        const newLink = new Link({
            userId:userId,
            originalURL: originalURL,
            shortCode: shortCode,
        });

        await newLink.save();

        const shortUrl = `https://your.site/${shortCode}`;
        res.status(201).json({ shortUrl });
    }
    catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error.message
        });
    }
};

module.exports = {
    short
}
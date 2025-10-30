const mongoose = require('mongoose');
const Link = require('../models/link');

const analyticsSchema = new mongoose.Schema({

    linkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link',
        required: true,
        index: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    device: {
        type: String,
    },
    browser: {
        type: String,
    },
    country: {
        type: String,
    },
    os: {
        type: String,
    },
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        }
});

const Analytics  = mongoose.model('Analytics',analyticsSchema);

module.exports = Analytics;
const UAParser = require('ua-parser-js');
const Link = require('../models/link');
const Analytics = require('../models/analytics');
const geoip = require('geoip-lite');

const trackClick = async ({shortCode,ipAddress,userAgent})=>{
    const link = await Link.findOne({shortCode});
    if(!link){
        return null;
    }
    const uaResult = new UAParser(userAgent).getResult();

    const loc = geoip.lookup(ipAddress);

    const analyticsData = new Analytics({
        linkId:link._id,
        ipAddress:ipAddress,
        browser:uaResult.browser.name,
        os:uaResult.os.name,
        device:uaResult.device.type || 'desktop',
        country:loc?loc.country:'Unknown'
    });

    try {
        await Promise.all([
            analyticsData.save(),
            Link.updateOne({_id:link._id},{$inc:{clickCount:1}})
        ]);
    } catch (error) {
        console.error("Error occured in trackClick",error.message);
    }
    return link.originalURL;
}

module.exports = trackClick;
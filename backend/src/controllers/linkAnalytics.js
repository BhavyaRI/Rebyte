const Analytics = require("../models/analytics");
const mongoose = require("mongoose");

const getLinkData = async (req, res) => {
  try {
    const { linkId } = req.params;
    const endDate = req.query.endDate
      ? new Date(req.query.endDate)
      : new Date();
    const defaultStartDate = new Date();
    defaultStartDate.setDate(endDate.getDate() - 7);

    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : defaultStartDate;

    const adata = await Analytics.aggregate([
      {
        $match: {
          linkId: new mongoose.Types.ObjectId(linkId),
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $facet: {
          totalClicks: [{ $count: "count" }],
          clicksOverTime: [
            {
              $group: {
                _id: {
                  $dateTrunc: {
                    date: "$createdAt",
                    unit: "day",
                    timezone: "UTC" 
                  }
                },
                count: { $sum: 1 },
              },
            },
            {
              $sort: { _id: 1 },
            },
            {
              $project: {
                _id: {
                  $dateToString: { format: "%d-%m-%Y", date: "$_id" }
                },
                count: 1
              }
            }
          ],
          countries: [{ $sortByCount: "$country" }],
          cities: [{ $sortByCount: "$city" }],
          browser: [{ $sortByCount: "$browser" }],
          os: [{ $sortByCount: "$os" }],
          device: [{ $sortByCount: "$device" }],
        },
      },
    ]);

    if (!adata[0] || !adata[0].totalClicks) {
      // Send a default empty structure
      return res.json({
        totalClicks: 0,
        clicksOverTime: [],
        countries: [],
        cities: [],
        browsers: [],
        os: [],
        devices: [],
        topCountry: "N/A",
        topDevice: "N/A",
      });
    }

    const result = {
      totalClicks: adata[0].totalClicks[0] ? adata[0].totalClicks[0].count : 0,
      clicksOverTime: adata[0].clicksOverTime,
      countries: adata[0].countries,
      cities: adata[0].cities,
      browser: adata[0].browser,
      os: adata[0].os,
      device: adata[0].device,
    };

    result.topCountry = result.countries[0] ? result.countries[0]._id : "N/A";
    result.topDevice = result.device[0] ? result.device[0]._id : "N/A";

    res.json(result);

  } catch (error) {
    console.error("Aggregation error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {getLinkData};
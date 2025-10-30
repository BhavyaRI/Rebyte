const express = require("express");
const accountRoutes = require("./src/routes/accountRoutes");
const cors = require("cors");
const link = require("./src/models/link");
const app = express();
const UAParser = require("ua-parser-js");
const trackClick = require('./src/utils/analysisService');

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", accountRoutes);

app.use("/:shortCode", async (req, res) => {

  const { shortCode } = req.params;
  const ipAddress = req.ip;

  console.log(ipAddress);
  
  try {
    const originalURL = await trackClick({
      shortCode: req.params.shortCode,
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    });

    if (!originalURL) {
      return res.status(404).send("URL not found");
    }
    res.redirect(originalURL);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = app;

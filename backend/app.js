const express = require("express");
const mongoose = require("mongoose");
const accountRoutes = require("./src/routes/accountRoutes");
const cors = require("cors");
const link = require("./src/models/link");
const UAParser = require("ua-parser-js");
const trackClick = require("./src/utils/analysisService");
const { getLinkData } = require("./src/controllers/linkAnalytics");


const app = express();

const DB = process.env.MONGO_URL;

if (mongoose.connection.readyState === 0) {
    mongoose.connect(DB).then(() => {
        console.log("Database connected successfully within App");
    }).catch(err => {
        console.error("DB Connection Error:", err.message);
    });
}

app.set("trust proxy", true);
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://rebyte-khaki.vercel.app" // <--- PASTE YOUR ACTUAL FRONTEND URL HERE
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", accountRoutes);

app.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  try {
    const originalURL = await trackClick({
      shortCode: shortCode,
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    });

    if (!originalURL) {
      return res.status(404).send("URL not found");
    }
    if (
      !originalURL.startsWith("http://") &&
      !originalURL.startsWith("https://")
    ) {
      console.warn(`Missing protocol, adding https:// to: ${originalURL}`);
      return res.redirect(`https://${originalURL}`);
    }
    res.redirect(originalURL);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = app;

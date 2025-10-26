const express = require("express");
const accountRoutes = require("./src/routes/accountRoutes");
const cors = require("cors");
const link = require("./src/models/link");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", accountRoutes);
app.use("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  try {
    const urlEntry = await link.findOne({ shortCode });
    if (!urlEntry) {
      return res.status(404).send("URL not found");
    }
    res.redirect(urlEntry.originalURL);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = app;

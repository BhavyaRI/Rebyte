const express = require('express');
const accountRoutes = require('./src/routes/accountRoutes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',accountRoutes);

module.exports = app;

const express = require('express');
const accountRoutes = require('./src/routes/accountRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',accountRoutes);

module.exports = app;

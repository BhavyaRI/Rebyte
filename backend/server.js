const express = require('express');
const mongoose = require('mongoose');


const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path:'./config.env'});
const DB = process.env.MONGO_URL;
const port = process.env.PORT;

if(!DB){
    console.error("Database url not defined");
    process.exit(1);
}

const startserver  = async () =>{
    try{
        const conn = await mongoose.connect(DB);
        
        console.log("Database connected successfully");
        
        app.listen(port,()=>{
            console.log(`Server is running on port:${port}`);
        });

    }
    catch(err){
        console.error("Error connecting to database",error.message);
        process.exit(1);
    }
}

startserver();



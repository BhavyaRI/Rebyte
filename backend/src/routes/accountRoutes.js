const express = require('express');
const authcontrollers = require('../controllers/authcontroller');
const router = express.Router();

router.post('/signin',authcontrollers.signin);
router.post('/login',authcontrollers.login);

module.exports=router;


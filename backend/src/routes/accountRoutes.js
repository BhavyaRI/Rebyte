const express = require('express');
const authcontrollers = require('../controllers/authcontroller');
const {protect} = require('../middlewares/authMiddleware');
const {short} = require('../controllers/urlshortcontroller');
const router = express.Router();

router.post('/signin',authcontrollers.signin);
router.post('/login',authcontrollers.login);

router.post('/shorten',protect,short);

router.post('/forgotPassword',authcontrollers.forgotPassword);

router.patch('/resetPassword/:token',authcontrollers.resetPassword);

router.get('/me',protect,authcontrollers.getMe);

module.exports=router;


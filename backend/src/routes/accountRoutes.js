const express = require('express');
const authcontrollers = require('../controllers/authcontroller');
const {protect} = require('../middlewares/authMiddleware');
const {short,getAllLinks,deleteLink} = require('../controllers/urlshortcontroller');
const {generateqr} = require('../controllers/qrcodeGenerator');
const router = express.Router();

router.post('/signin',authcontrollers.signin);
router.post('/login',authcontrollers.login);
router.get('/qrcode',generateqr);

router.post('/shorten',protect,short);
router.get('/links',protect,getAllLinks);

router.post('/forgotPassword',authcontrollers.forgotPassword);

router.patch('/resetPassword/:token',authcontrollers.resetPassword);

router.delete('/deleteLink/:id',deleteLink);

router.get('/me',protect,authcontrollers.getMe);

module.exports=router;


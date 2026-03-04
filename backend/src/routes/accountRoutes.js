const express = require('express');
const authcontrollers = require('../controllers/authcontroller');
const {protect} = require('../middlewares/authMiddleware');
const {short,getAllLinks,deleteLink,editLink} = require('../controllers/urlshortcontroller');
const {generateqr} = require('../controllers/qrcodeGenerator');
const router = express.Router();
const {getLinkData} = require('../controllers/linkAnalytics');

router.post('/signin',authcontrollers.signin);
router.post('/login',authcontrollers.login);
router.get('/qrcode',generateqr);
router.get('/analytics/:linkId',getLinkData);

router.post('/shorten',protect,short);
router.get('/links',protect,getAllLinks);

router.post('/forgotPassword',authcontrollers.forgotPassword);

router.patch('/resetPassword/:token',authcontrollers.resetPassword);

router.delete('/deleteLink/:id',deleteLink);
router.patch('/editLink/:id',protect,editLink);


module.exports=router;

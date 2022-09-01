const express = require('express');
const { readToken } = require('../config/token');
const pageController = require('../controller/page')
const router = express.Router();

router.get('/', pageController.getAlldata);
router.post('/login', pageController.login);
router.get('/namaid/:id', readToken, pageController.getNamaByID);
router.get('/namakota/:kota_id', readToken, pageController.getNamaByKotaID);

module.exports = router;
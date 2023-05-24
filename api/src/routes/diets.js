const { Router } = require('express');
const router = Router();

const {  getDiets } = require('../controllers/dietController.js');

router.get('/diets', getDiets);


module.exports = router;
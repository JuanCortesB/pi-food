const { Router } = require('express');
const router = Router();

const { allApiAndDb } = require('../controllers/recipeController.js');

router.get('/recipes', allApiAndDb);


module.exports = router;
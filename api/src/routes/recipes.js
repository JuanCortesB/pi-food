const { Router } = require('express');
const router = Router();

const { allApiAndDb, getAllByName, getAllByID } = require('../controllers/recipeController.js');

router.get('/recipes', getAllByName);
router.get('/recipes/:id', getAllByID);


module.exports = router;
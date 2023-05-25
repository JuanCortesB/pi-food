const { Router } = require('express');
const router = Router();

const { allApiAndDb, getAllByName, getAllByID, postRecipe } = require('../controllers/recipeController.js');

router.get('/recipes', getAllByName);
router.get('/recipes/:id', getAllByID);
router.post('/recipe', postRecipe);


module.exports = router;
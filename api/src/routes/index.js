const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routeForRecipes = require('./recipes.js');
const routeForDiets = require('./diets.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(routeForRecipes);
router.use(routeForDiets);


module.exports = router;

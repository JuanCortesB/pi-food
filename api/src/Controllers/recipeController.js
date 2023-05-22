const { Recipe, Diets } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');
const { APIKEY } = process.env;
require('dotenv').config();

//traer todos las recetas de la API

const getAllApiFood = async () => {
    try {
        console.log("getAllApiFood function called");
        const url = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${APIKEY}&addRecipeInformation=true&number=100`);

        const apiUrlInfo = await url.data.results.map(d => {
            return {
                id: d.id,
                name: d.title,
                summary: d.summary,
                image: d.image,
                score: d.spoonacularScore,
                healthScore: d.healthScore,
                steps: d.analyzedInstructions.map(r => r.steps.map(s=>s.step))
                .flat(1)
                .join(""),
            };
        });
        return apiUrlInfo;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving data from API.');
    }
};

const getAllApiDb = async () => {
    console.log("getAllApiDb function called");
    const  allDataDb = await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    const response = await allDataDb?.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.name,
            summary: recipe.summary,
            image:  recipe.image,
            score: recipe.score,
            healtScore: recipe.healtScore,
            steps: recipe.steps,
        }
    }); 
    return response;
}

const allApiAndDb = async (req, res) => {
    console.log("allApiAndDb function called");
    try {
        const allApiFood = await getAllApiFood();
        const allApiDb = await getAllApiDb();
        const apiAndDb = [...allApiFood, ...allApiDb];
        res.json(apiAndDb);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al traer data' });
    }
}


module.exports = {
    allApiAndDb,
}
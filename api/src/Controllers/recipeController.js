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
        res.status(500).json({ message: 'Error al traer data' });
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
        return apiAndDb;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

///name

const getAllByName = async (req, res) => {
    try {
        const {name} = req.query;
        let apiAndDbdata = await allApiAndDb();
        
        if (name) {
            let recipeName = apiAndDbdata.filter(data => data.name.toLowerCase().includes(name.toLowerCase()));
            if (recipeName.length > 0) {
                res.status(200).json(recipeName);
            } else {
                res.status(404).json({ message: 'no existe name'});
            }
        } else {
            res.status(200).json(apiAndDbdata);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al traer data por nombre' });

    }
}
/// GET BY ID

const getAllByID = async (req, res) => {
    try{
        const {id} = req.params;
        let apiAndDbdata = await allApiAndDb();
        
        if (id) {   
            let recipeId = apiAndDbdata.find(data => data.id == id);
            if (recipeId) {
                res.status(200).json(recipeId);
            } else {
                res.status(404).json({ message: 'no existe id'});
            }
        } else {
            res.status(200).json(apiAndDbdata);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al traer data por id' });
    }
}


module.exports = {
    allApiAndDb, 
    getAllByName,
    getAllByID,
}
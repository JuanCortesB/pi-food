const {Diets} = require('../db.js');
const axios = require('axios');

const allDiets = [
    {name: 'Gluten Free' },
    {name: 'Ketogenic' },
    {name: 'Vegetarian' },
    {name: 'Lacto-Vegetarian' },
    {name: 'Ovo-Vegetarian' },
    {name: 'Vegan' },
    {name: 'Pescetarian' },
    {name: 'Paleo' },
    {name: 'Low FODMAP' },
    {name: 'Whole30' },
]
const getDiets = async (res) => {
    try {
        const dataDiets = await Diets.findAll();
    if (dataDiets.length) {
        // return dataDiets;
        res.status(200).json(dataDiets);
        console.log('dentro del if');
    } else {
       await Diets.bulkCreate(allDiets)
    //    return allDiets
       res.status(200).json(allDiets)
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al traer diets' })
    }
}

module.exports = {
    getDiets,
}
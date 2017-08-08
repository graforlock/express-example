const Sequelize = require('sequelize');
const db = require('../db');

const Recipes = db.define(
    'recipes',
    {
        name: { type: Sequelize.STRING },
        cookingTime: { type: Sequelize.INTEGER },
        ingredients: { type: Sequelize.TEXT },
        imageUrl: { type: Sequelize.TEXT }
    },
    {
        timestamps: false
    }
);

module.exports = Recipes;

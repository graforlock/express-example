require('dotenv').config();

const db = require('./db');
const Recipes = require('./models/recipes');

db.sync().then(function() {
    Recipes
    .bulkCreate([
    {
        name: 'Chicken Taco Filling',
        cookingTime: 30,
        ingredients: 'Chicken, Dry Taco, Seasoning',
        imageUrl: 'http://chicken.taco.url'
    },
    {
        name: 'Chicken Breast Cutlets with Artichokes and Capers',
        cookingTime: 40,
        ingredients: 'Flour, Salt, Canola Oil, Butter, Lemon Juice, Butter',
        imageUrl: 'http://chicken.breast.cutlets.url'
    }
]);
});
const express = require('express');
const router = express.Router();
const Recipes = require('../models/recipes');

/* GET home page. */
router.get('/', async (req, res, next) => {
    const { count, rows: recipes } = await Recipes.findAndCountAll({ limit: 10 });
    const cookingTimes = await Recipes.findAll({ group: ['cookingTime']});
    res.render('index', { recipes, count, cookingTimes });
});

router.get('/:recipe', async (req, res, next) => {
    const recipe = await Recipes.findById(req.params.recipe);
    res.render('recipe', { recipe });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const constants = require('../constants');
const Recipe = require('../models/recipe');


/* GET home page. */
router.get('/', async (req, res, next) => {
    const activeFilter = constants.AVAILABLE_FILTERS.some(x => x in req.query);
    if(activeFilter) {
        const { q, ingredients, time} = req.query;
        const $search = q && ingredients
            ? `"${q}" ${ingredients}` 
            : q || ingredients;
        const test = time 
            ? await Recipe.find({ $text : { $search } })
            : await Recipe.find({ $text: { $search } }, { cookingTime: Number(time) });
        console.log(test);
    } 
    const recipes = await Recipe.find().limit(10);
    const count = await Recipe.count();
    const cookingTimes = await Recipe.collection.distinct("cookingTime");
    res.render('index', { recipes, count, cookingTimes });
});

router.get('/:recipe', async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.recipe);
    res.render('recipe', { recipe });
});

module.exports = router;

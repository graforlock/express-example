const express = require('express');
const paginate = require('express-paginate');
const router = express.Router();

const { AVAILABLE_FILTERS, PAGE } = require('../constants');

const asyncMiddleware = require('../middleware/async');
const pagination = require('../services/pagination');
const Recipe = require('../models/recipe');

router.use(paginate.middleware(10, 50));

router.get('/', async (req, res, next) => {
    let recipes;
    const cookingTimes = await Recipe.distinct('cookingTime');
    const { ingredients, recipe, time } = req.query;
    const paginateBounds = { page: req.query.page, limit: PAGE.LIMIT };
    const queryObject = time ? { cookingTime: Number(time)} : {};
   
    if (recipe || ingredients) {
        const $search = recipe && ingredients
            ? `"${recipe}" ${ingredients}`
            : recipe || ingredients;

        recipes = await Recipe.paginate(
                Object.assign({ $text: { $search }}, queryObject),
                paginateBounds
            )
    } else {
        recipes = await Recipe.paginate(queryObject, paginateBounds);
    }
    recipes.cookingTimes = cookingTimes;
    recipes.pagination = pagination(req, recipes.pages);
    res.render('index', recipes);
});

router.get(
    '/:recipe',
    asyncMiddleware(async (req, res, next) => {
        const recipe = await Recipe.findById(req.params.recipe);
        res.render('recipe', { recipe });
    })
);

module.exports = router;

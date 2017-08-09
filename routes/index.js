const express = require('express');
const paginate = require('express-paginate');
const router = express.Router();

const { AVAILABLE_FILTERS, PAGE } = require('../constants');

const asyncMiddleware = require('../middleware/async');
const pagination = require('../services/pagination');

const Rating = require('../models/rating');
const Recipe = require('../models/recipe');

router.use(paginate.middleware(10, 50));

router.get('/', async (req, res, next) => {
    let recipes;
    const cookingTimes = await Recipe.distinct('cookingTime');
    const { ingredients, recipe, time } = req.query;
    const paginateBounds = { page: req.query.page, limit: PAGE.LIMIT };
    const queryObject = time ? { cookingTime: Number(time) } : {};

    if (recipe || ingredients) {
        const $search = recipe && ingredients
            ? `"${recipe}" ${ingredients}`
            : recipe || ingredients;

        recipes = await Recipe.paginate(
            Object.assign({ $text: { $search } }, queryObject),
            paginateBounds
        );
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
        let rating;
        const recipe = await Recipe.findById(req.params.recipe);
        if (req.user) {
            rating = await Rating.findOne({
                accountId: req.user._id,
                recipeId: recipe._id
            });
        }
        // A single call option might be to keep ratings within Account.
        // However, in the long run, the account might not be the best place
        // to make recommendation engines if needed.
        res.render('recipe', {
            recipe,
            user: !!req.user,
            rating: rating || { stars: 0 }
        });
    })
);

module.exports = router;

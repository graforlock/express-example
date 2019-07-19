const express = require('express');
const paginate = require('express-paginate');
const router = express.Router();

const asyncMiddleware = require('../middleware/async');
const Rating = require('../models/rating');

router.post(
  '/:recipe',
  asyncMiddleware(async ({ body, params, user }, res, next) => {
    await Rating.update(
      { recipeId: params.recipe, accountId: user._id },
      { $set: { stars: body.rating } },
      { upsert: true }
    );
    res.redirect(`/${params.recipe}`);
  })
);

module.exports = router;

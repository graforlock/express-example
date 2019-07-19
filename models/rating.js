const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Rating = new Schema({
  stars: Number,
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe' }
});

module.exports = mongoose.model('Rating', Rating);

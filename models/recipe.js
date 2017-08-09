const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, default: '' },
  cookingTime: { type: Number, default: 0 },
  ingredients: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  stars: { type: Number, default: '' }
});

recipeSchema.index({ name: 'text', ingredients: 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);

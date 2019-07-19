exports.AVAILABLE_FILTERS = ['ingredients', 'recipe', 'time'];

exports.PAGE = {
  LIMIT: Number(process.env.LIMIT_PER_PAGE),
  MAX_DISPLAYED: Number(process.env.MAX_DISPLAYED)
};

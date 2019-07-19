const paginate = require('express-paginate');
const { PAGE } = require('../constants');

module.exports = (req, pages) => 
  paginate.getArrayPages(req)(PAGE.MAX_DISPLAYED, pages,req.query.page);

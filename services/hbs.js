const hbs = require('hbs');

const { AVAILABLE_FILTERS } = require('../constants');

hbs.registerHelper('eq', (v1, v2) => v1 == v2);
hbs.registerHelper('hasFilters', filters => 
    AVAILABLE_FILTERS.some(v => v in filters)
);

module.exports = hbs;
const hbs = require('hbs');

hbs.registerHelper('eq', (v1, v2) => v1 == v2);

module.exports = hbs;
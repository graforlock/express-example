const hbs = require('hbs');

hbs.registerHelper('json', context => JSON.stringify(context));

module.exports = hbs;
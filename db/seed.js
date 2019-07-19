const faker = require('faker');
const connection = require('../db/connection');

const Email = require('../models/email');

const emailSeed = [...Array(900).keys()].map(() => ({
  text: faker.lorem.sentences(),
  meta: { source: faker.finance.accountName(), url: faker.internet.url() }
}));

Email.insertMany(emailSeed).then(() => process.exit(0));
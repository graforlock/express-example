const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    username: String,
    password: String,
    ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);

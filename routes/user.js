const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Rating = require('../models/rating');

const router = express.Router();

router.get('/', async (req, res) => {
    const ratings = await Rating.find({ accountId: req.user._id, stars: { $gt: 0 } })
        .populate('recipeId');
    res.render('profile', { user: req.user, ratings });
});

router.get('/register', (req, res) => {
    res.render('register', {});
});

router.post('/register', (req, res) => {
    Account.register(
        new Account({ username: req.body.username }),
        req.body.password,
        (err, account) => {
            if (err) {
                return res.render('register', { account: account });
            }

            passport.authenticate('local')(req, res, () => {
                res.redirect('/user');
            });
        }
    );
});

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/user');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/user');
});

module.exports = router;

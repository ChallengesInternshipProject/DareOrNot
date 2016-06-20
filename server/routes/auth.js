var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');
var bcrypt = require('bcrypt-nodejs');

router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'Login'
    });
});

router.get('/login', function (req, res, next) {
    var email = req.param('email');
    var password = req.param('password');

    User.findOne({
        email: email
    }, function (err, user) {
        if (err) {
            return res.json({
                success: false,
                err: err
            });
        }
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.json({
                success: false
            });
        }
        return res.json({
            id: user._id,
            email: email,
            success: true
        });
    });

    // res.json(req.param('test'));
});

router.get('/register', function (req, res, next) {
    var userData = {
        email: req.param('email'),
        password: bcrypt.hashSync(req.param('password1')),
        firstName: req.param('firstName'),
        lastName: req.param('lastName'),
        phone: req.param('phone'),
        town: req.param('town'),
        country: req.param('country'),
        dateOfBirth: req.param('dateOfBirth')
    };


    var newUser = new User({
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        town: userData.phone,
        country: userData.country,
        dateOfBirth: userData.dateOfBirth
    });
    User.find({email: userData.email}, function (err, user) {
        if (user.length) {
            return res.send('user already exists !');
        } else {
            newUser.save(function (err) {
                return res.send('User saved');
            });
        }
    })
});
// router.get('/login', function(req, res, next) {
//   res.send({
//     id:req.user._id,
//     user: req.user.email
//   });
// });
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/login',
//     failureRedirect: '/login'
// }));
//
// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });
module.exports = router;

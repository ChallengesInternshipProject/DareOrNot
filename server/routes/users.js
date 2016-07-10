var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/users');
var bcrypt = require('bcrypt-nodejs');
//var $q = require('q');

//FOR TESTING PURPOSES !!!
// User.remove({},function(err){
//   console.log('all removed');
// });
// var testUser = new User({
//     email: 'test@intern.com',
//     password: bcrypt.hashSync('test'),
// });
// //
// testUser.save();
// /* GET users listing. */
// var hash = bcrypt.hashSync("wtf");
// console.log(hash);
//END OF TESTING PURPOSES

router.get('/', function (req, res, next) {

    User.find(function (err, users) {
        var resultUsers=[];
        users.forEach(function(user, index){
           
            User.getFriends(user._id,function(friends){
                var resultUser= user;
                resultUser.friends = [];
                resultUsers.push(resultUser);
                console.log(resultUsers);
            })
            if(index == users.length - 1) {
                res.json(resultUsers)
            }
        });


    });
});
router.get('/user/:user', function (req, res, next) {
    // return res.send(req.params)
    User.findOne({email: req.params.user}, function (err, user) {
        if (err) {
            return res.send(err);
        }
        return res.json(user);
    });
});

router.get('/friends/:user', function(req, res, next){

    //var friendStatus = require("mongoose-friends").Status;
    User.getFriends(req.param('user'), function(err,friends){
        if(err){
            return res.json(err);
        }
        return res.json(friends)
    });
})
module.exports = router;
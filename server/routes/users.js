var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/users');
var bcrypt = require('bcrypt-nodejs');

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
    User.find(function (err, user) {
        res.json(user);
    });
});
router.get('/:user', function (req, res, next) {

    // return res.send(req.params)
    User.findOne({email: req.params.user}, function (err, user) {
        if (err) {
            return res.send(err);
        }

        //remove the pass hash from the response
        user.password = null;

        return res.json(user);
    });
});

module.exports = router;
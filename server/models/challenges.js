var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var challengeSchema = new Schema({
    //The id can be a number or a string
    // id: String,
    title: String,
    description: String,
    location: {
        lat: Number,
        lng: Number
    }
    // //The price can be Zer0
    // price: {
    //     min: Number,
    //     max: Number
    // },
    // dateCreated: Date,
    // startDate: Date,
    // //The end date must be after the start date :O
    // endDate: Date,
    // isPublic: Boolean,
    // invitedUsers: Array,
    // watchingUsers: Array,
    // //users who accepted the challenge
    // acceptedUsers: Array,
    // //Comments about the challenge.
    // comments: Array

    //TODO limits maximum and minimum lenght of strings
});

var Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;

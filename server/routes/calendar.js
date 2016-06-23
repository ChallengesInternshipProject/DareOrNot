var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Challenge = require('../models/challenges');
var moment = require('moment');

function getCalendarEvents(from,to,createdBy,showUserChallenges){
	//FORMAT THE DATES
	var result = {
	};
	var days = from.daysInMonth() 
	var today = from;
	var currentDate =  from.startOf('month')

	console.log('start:' +  Number(currentDate.format('E')))

	result.fromStart = Math.abs(Number(currentDate.format('E'))-1);
	//add emtpy days ad the begining

	for(var i = 0; i< days; i++){
		var currentDay = {
			date:currentDate,
			day:currentDate.format('D'),
			events:[]
		}
		result[currentDate.format('D/M/YYYY')]=currentDay;
		currentDate.add(1,'d');
	}
	console.log(result)
}


router.get('/', function(req, res, next) {
		from = new moment();
		to = new moment().add(1,'M');

		getCalendarEvents(from,to,'ajfisifja',false)
		//console.log(req);
		res.json("SAKOkdA")
	}
);


module.exports = router;

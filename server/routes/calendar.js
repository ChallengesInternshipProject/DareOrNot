"use strict";
var express = require('express');
var router = express.Router();
var moment = require('moment');
var Challenge = require('../models/challenges');
class Calendar{
	constructor(userID,year,month,context){
		console.log(arguments)
		// for(argument of arguments){
		// 	console.log(arguments);
		// }
		//this.getCalendarDays(year,month);
		
		// if(context != undefined){
		// 	this[action+context].apply(this,arguments);
		// }
	}

	// build calendar
	 getCalendarDays(year,month){
		//Get first date of the month
		//M is array and we have to subtract 1
		month -=1;

		this.result = [];
		var currentDate = new moment({d:1,M:month,y:year});
		var days = currentDate.daysInMonth();

		//add emtpy days
		//Calculate days after monday
		var emtpyDaysInfront = Number(currentDate.format('E'))-1;
		//Change starting day
		currentDate=currentDate.subtract(emtpyDaysInfront,'d');

		days +=emtpyDaysInfront; 
		//Set starting date to the monday of the 1st week
		this.startDate=currentDate.format()
		//calculate the last day
		this.toDate = new moment(currentDate.format()).add(days,'d');
		//Add days so the days can end on sunday
		days +=  Math.abs(Number(this.toDate.format('E'))-7);
		//Calculate the end date
		this.toDate = new moment(this.startDate).add(days,'d').format()
		
		for(var i = 0; i< days; i++){
			var currentDay = {
				date:currentDate,
				day:currentDate.format('D'),
				events:[],
				isFromCurrentMonth:	 month+1 ==  currentDate.format('M') ? true : false,
			}
			this.result[currentDate.format('D/M/YYYY')]=currentDay;
			currentDate.add(1,'d');
		}
	
	}

	parseEvents(){
		//console.log(this)
		var result = {
			startDate:this.startDate,
			toDate:this.toDate,
			days:[]
		}
		//console.log(this.result);
		for(var day in this.result){
			result.days.push(JSON.stringify(this.result[day]))
		}
	
		return result
	}
	
	setEvents(events){
		post.forEach(function(event,index){
			obj.result[moment(event.startDate).format('D/M/YYYY')].events.push(event)
		})
	}
	getCalendar(userID){
		var getEvents = function(obj,userID,fromDate,toDate,category,except){
			 Challenge
			 .find({
				_creator:req.params.userID,
				title : {$ne:null},
				startDate:{$gte:moment(obj.startDate).format()},
				endDate:{$lte:moment(obj.toDate).format()}
			 })
			 .populate('_creator')
			 .exec(
				function (err,post) {
					
					post.forEach(function(event,index){
						obj.result[moment(event.startDate).format('D/M/YYYY')].events.push(event)
					})
					res.json(obj.parseEvents())			
					//res.json('SOME STRING');
				}
			);
		}
		//call the function


		
	}

	
}
//End of class definition

router.get('/:userID/:year/:month',function(req,res,next){
	var eventCalendar = new Calendar(
		req.params.userID,
		req.params.year,
		req.params.month,
		'getCalendar'
	);
	res.json('sdmasddasdasd');
});


module.exports = router;

var express = require('express');
var router = express.Router();
var moment = require('moment');
var Challenge = require('../models/challenges');
class Calendar{
	constructor(userID,year,month,action,context){
		this.getCalendarDays(year,month);
		
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
		var emtpyDaysInfront = Number(currentDate.format('E'))-1;
		currentDate=currentDate.subtract(emtpyDaysInfront,'d');

		days +=emtpyDaysInfront; 
		this.startDate=currentDate.format()
		this.toDate = new moment(currentDate.format()).add(days,'d');
		
		days +=  Math.abs(Number(currentDate.format('E'))-7);
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
	getCalendarEvents(userID){

		 Challenge
			 .find({
				_creator:userID,
				title : {$ne:null},
				startDate:{$gte:moment(this.fromDate).format()},
				endDate:{$lte:moment(this.toDate).format()}
			 })
			 .populate('_creator')
			 .exec(this.testFunc);
			
	
		// NOT WORKING 
		//this.result =  this.getEvents(this,userID)
		//console.log(this)
	}

	getEvents(obj,userID){
		//console.log(obj.result['23/6/2016'])
		 Challenge
		 .find({
			_creator:userID,
			title : {$ne:null},
			startDate:{$gte:moment(obj.fromDate).format()},
			endDate:{$lte:moment(obj.toDate).format()}
		 })
		 .populate('_creator')
		 .exec(
			function (err,post) {
				post.forEach(function(event,index){
					console.log(obj.result)
					console.log(moment(event.startDate).format('D/M/YYYY'))
					//console.log(obj.result[moment(event.startDate).format('D/M/YYYY')])
					//console.log(obj.result[moment(event.startDate).format('D/M/YYYY')])
					//obj.result[moment(event.startDate).format('D/M/YYYY')].events.push(event)
				})
				
			}
		);
	}
}
//End of class definition
function test(obj,req,res,next){
	//eventCalendar.getCalendarEvents(req.params.userID);
	 Challenge
	 .find({
		_creator:req.params.userID,
		title : {$ne:null},
	 })
	 .populate('_creator')
	 .exec(
		function (err,post) {
			post.forEach(function(event,index){
				obj.result[moment(event.startDate).format('D/M/YYYY')].events.push(event)
			})
			res.json(obj.parseEvents())			
		}
	);
	
}
function parseRequest(req, res, next) {
	var eventCalendar = new Calendar(req.params.userID,req.params.year,req.params.month,'get','CalendarEvents');
	test(eventCalendar,req,res,next);
}
router.get('/:userID/:year/:month', parseRequest);


module.exports = router;

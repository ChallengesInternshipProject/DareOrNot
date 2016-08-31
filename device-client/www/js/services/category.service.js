angular.module('starter.services')
	.service('CategoryService', function(){
		var category = {};

		category.getAllGategories = function(){
			return [
	  			{
	  				id: 1,
	  				title : "Забавни Предизвикателства",
	  				count :12345,
	  				class : "box1",
	  				titleClass : "color1",
	  				slug : "funny"
	  			},
	  			{
	  				id: 2,
	  				title : "Бизнес Предизвикателства",
	  				count :3456,
	  				class : "box2",
	  				titleClass : "color2",
	  				slug : "business"
	  			},
	  			{
	  				id: 3,
	  				title : "Предизвикателства с Награда",
	  				count :12345,
	  				class : "box3",
	  				titleClass : "color3",
	  				slug : "price"
	  			},
	  			{
	  				id: 4,
	  				title : "Благотворителни Предизвикателства",
	  				count :12345,
	  				class : "box4",
	  				titleClass : "color4",
	  				slug : "charity"
	  			},
	  		]
		}

		return category
		
	})	
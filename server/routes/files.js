var express = require('express');
var router = express.Router();
var File = require('../models/files')
/* GET home page. */
router.get('/', function(req, res, next) {
		res.render('files', {
			title: 'Files test form',
		});
});
router.post('/', function(req, res, next) {
	file = new File();
	file.uploadFile(req,"testFile","fileInput","testObj","testObjID","me").then(function(result){
		file.object = req.object;
		file.objectId = req.objectId;
		file.name = req.objectId;
		file.type = "fileType";
		file.save(function(err,file){
			if (err) { return next(err);};
			res.json(file)
		})
	}).catch(function(err){
		return next(err);
	})
	

});

module.exports = router;

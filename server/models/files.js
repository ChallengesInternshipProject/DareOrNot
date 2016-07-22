var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var multer = require('multer');
var $q = require('q');

var fileSchema = new Schema({
	object : String,
	objectId : String,
	filename : String,
	fileType : String,
	//uploadedBy:{type: Schema.Types.ObjectId,ref:'User'},
});

fileSchema.methods.uploadFile  = function(req,filename,filefield,object,objectId,uploadedBy){
	var fs = require('fs')
	var path = '../uploads/smth9';
	var storage = multer.diskStorage({
		destination : function(req,file,callback){
			callback(null, path);
		},
		filename : function(req, file, callback){
			callback(null, file.fieldname  + "-" + Date.now())
		}
	})
	var result = $q.defer();
	var upload = multer({ storage : storage}).single("fileInput");
	fs.stat(path, function(err,stats){
		if (err){
			var mode = 0777 & ~process.umask();
			fs.mkdirSync(path,mode)
		}
		upload(req,null,function(err) {

			console.log(req.file)
			if(err) {
				result.reject(err);
			}
			result.resolve(true)
		});
	});
	return result.promise;
}

var File = mongoose.model('File', fileSchema);

module.exports = File;
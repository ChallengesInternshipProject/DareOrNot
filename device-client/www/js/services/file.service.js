angular.module('starter.services')
	.service('FileService', function($ionicLoading){
			
		var file = {
			fileData : []
		}

		file.processFiles = function(files){
			angular.forEach(files, function(flowFile, i){
				var fileReader = new FileReader();
				fileReader.onload = function (event) {
					file.fileData.push(event.target.result);
				};
				fileReader.readAsDataURL(flowFile.file);
			});
		}

		return file;
	})
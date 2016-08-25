angular.module('starter.services')
	.service('FileService', function($ionicLoading){
			
		var file = {
			files : []
		}

		file.processFiles = function(files){
			$ionicLoading.show({
				template: 'Loading...'
			});
			angular.forEach(files, function(flowFile, i){
				var fileReader = new FileReader();
				fileReader.onload = function (event) {
				var uri = event.target.result;
						file.files[i] = uri;     
				};
				fileReader.readAsDataURL(flowFile.file);
			});
		};

		return file;
	})
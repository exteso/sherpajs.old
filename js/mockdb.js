angular.module('mongolab', ['ngResource']).
factory("Categories", function($http){
	var baseUrl = 'http://int.post.ch/vsc/webservice/mobile-service';
	var jsonp = 'jsonp=JSON_CALLBACK';
	
	return {query: function() {return $http.get('data/catalog.json');}};
});
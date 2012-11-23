(function($) {
"use strict";

//-----------------------------------------------------------------------------
// configurations
//-----------------------------------------------------------------------------

/*
     Defines application module and configures routes
*/

var sherpaModule = angular.module('new-order-app', ['mongolab', 'ngResource']).
config(['$routeProvider', function($routeProvider) {$routeProvider.
	when('', {templateUrl: 'partials/neworder.html', controller: NewOrderCtrl}).
    when('neworder', {templateUrl: 'partials/neworder.html', controller: NewOrderCtrl}).
    when('pickup', {templateUrl: 'partials/pickup.html', controller: NewOrderCtrl}).
    when('groupadmin', {templateUrl: 'partials/groupadmin.html', controller: NewOrderCtrl}).
    when('orderadmin', {templateUrl: 'partials/orderadmin.html', controller: NewOrderCtrl}).
	otherwise({redirectTo: ''});
}]);


/*
 Adds an http response interceptor to set a global loading variable
*/
sherpaModule.config(function($httpProvider) {
    function loadingInterceptor($q,$log, $rootScope) {
        function success(response) {
            $rootScope.loading=false;
            return response;
        }
        function error(response) {
            var status = response.status;
            $log.error('Response status: ' + status + '. ' + response);
            $rootScope.loading=false;
            return $q.reject(response);
        }
        return function(promise) {
            $rootScope.loading=true;
            return promise.then(success, error);
        }
    }
    $httpProvider.responseInterceptors.push(loadingInterceptor);
});


//-----------------------------------------------------------------------------
// services
//-----------------------------------------------------------------------------

    /*
     Sherpa service. It implements the REST API to get application data
     */
    sherpaModule.factory('SherpaService', ['Categories', function(Categories){
        return {
            getCatalogX: function(Categories) {
                return  Categories.query();
            },
            getCatalog: function() {
                return  [{name:'pippo'},{name:'pluto'}];
            }
        };
    }]);



sherpaModule.filter('formatPrice', function() {
    return function(input) {
        if (input == null) return "";
        return (input/100*100).toFixed(2);
    };
});

})(jQuery);




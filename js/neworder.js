var newOrderApp = angular.module('new-order-app', ['mongolab'])

newOrderApp.controller('ListCtrl', function ListCtrl($scope, Categories) {
    $scope.categories = Categories.query(function(){
		$scope.order = {};
		angular.forEach($scope.categories, function(category){
			angular.forEach(category.items, function(item){
				$scope.order[item.name]  = {qty : 0,
											editMode : true};
				//$console.log($scope.order[item.name]);
			});
		});
	});
	
	$scope.ordering = function(category){
		return category.order;
	};
	
	$scope.calculateTotals = function(category){
		$scope.totals = {};
		var catTotal = 0;
		angular.forEach(category.items, function(item){
			var qty = $scope.order[item.name].qty;
			var price = item.price;
			var totalItem = qty*price;
			$scope.totals[item.name] = {'total' : catTotal};
			catTotal = catTotal + totalItem;	
		});
		$scope.totals[category.name] = {'total' : catTotal};
		return catTotal;
	};
	
});

newOrderApp.filter('formatPrice', function() {
	return function(input) {
		return (input/100*100).toFixed(2);
	};
});

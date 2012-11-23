var newOrderApp = angular.module('new-order-app', ['mongolab'])

newOrderApp.controller('ListCtrl', function ListCtrl($scope, Categories, Orders) {
    $scope.categories = Categories.query(function(){
		$scope.order = {};
		angular.forEach($scope.categories, function(category){
			angular.forEach(category.items, function(item){
				$scope.order[item.name]  = {qty : 0,
											editMode : false};
			});
		});
	});
    
    //$scope.result=Categories.query();
	$scope.totals = {};

	$scope.ordering = function(category){
		return category.order;
	};

	$scope.toggleEditMode = function(item){
		var itemEditMode = !$scope.order[item.name].editMode;
		$scope.order[item.name].editMode = itemEditMode;
	};

	$scope.calculateTotals = function(category){
		var catTotal = 0;
		angular.forEach(category.items, function(item){
			var qty = $scope.order[item.name].qty;
			var price = item.price;
			var totalItem = qty*price;
			$scope.totals[item.name] = {'total' : totalItem};
			catTotal = catTotal + totalItem;	
		});
		$scope.totals[category.name] = {'total' : catTotal};
		$scope.calculateOrderTotal();
		return catTotal;
	};
	
	$scope.calculateOrderTotal = function(){
		var orderTotal = 0;
		angular.forEach($scope.categories, function(category){
			var catTotal = $scope.totals[category.name];
			if (catTotal != null)
				orderTotal = orderTotal + catTotal.total;
		});	
		$scope.totals['order'] = {'total' : orderTotal};
	}
	
	$scope.save = function() {
		Orders.save($scope.order, function(order) {
		//$location.path('/edit/' + order._id.$oid);
		});
	}
	
});
/*
newOrderApp.controller('CreateCtrl', function CreateCtrl($scope, $location, Orders) {
	$scope.save = function() {
		Order.save($scope.order, function(order) {
		//$location.path('/edit/' + order._id.$oid);
		});
	}
});
 */
newOrderApp.filter('formatPrice', function() {
	return function(input) {
		if (input == null) return "";
		return (input/100*100).toFixed(2);
	};
});

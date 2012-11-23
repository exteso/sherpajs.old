// This is a module for cloud persistance in mongolab - https://mongolab.com
var mongolab = angular.module('mongolab', ['ngResource']);
mongolab.factory('Categories', function($resource) {
      var Category = $resource('https://api.mongolab.com/api/1/databases' +
          '/conprobio/collections/categories/:id',
          { apiKey: '509acf3de4b0f2aa6bbd0607' }, {
            update: { method: 'PUT' }
          }
      );
        Category.prototype.update = function(cb) {
        return Category.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
      };

        Category.prototype.destroy = function(cb) {
        return Category.remove({id: this._id.$oid}, cb);
      };
 
      return Category;
    });
	
mongolab.factory('Orders', function($resource) {
      var Order = $resource('https://api.mongolab.com/api/1/databases' +
          '/conprobio/collections/orders/:id',
          { apiKey: '509acf3de4b0f2aa6bbd0607' }, {
            update: { method: 'PUT' }
          }
      );
        Order.prototype.update = function(cb) {
        return Order.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
      };

        Order.prototype.destroy = function(cb) {
        return Order.remove({id: this._id.$oid}, cb);
      };
 
      return Order;
    });
	
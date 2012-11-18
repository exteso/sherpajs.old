// This is a module for cloud persistance in mongolab - https://mongolab.com
angular.module('mongolab', ['ngResource']).
    factory('Categories', function($resource) {
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
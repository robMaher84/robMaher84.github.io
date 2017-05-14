
angular
.module('movieApp')
.factory('imdbService', ["$http", function($http) {
  var runUserRequest = function(paramObj) {
    return $http({
      method: 'GET',
      url: "https://www.omdbapi.com/",
      params: paramObj
    });
  };

  return {
    events: function(paramObj) {
      return runUserRequest(paramObj);
    }
  };
}]);

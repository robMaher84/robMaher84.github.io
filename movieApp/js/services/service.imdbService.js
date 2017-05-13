
angular
.module('movieApp')
.factory('imdbService', ["$http", function($http) {
  var runUserRequest = function(paramObj) {
    console.log("PARAM OBJECT");
    console.log(paramObj);
    return $http({
      method: 'GET',
      url: "http://www.omdbapi.com/",
      params: paramObj
    });
  };

  return {
    events: function(paramObj) {
      return runUserRequest(paramObj);
    }
  };
}]);

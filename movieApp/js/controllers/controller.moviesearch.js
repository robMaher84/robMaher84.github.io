angular
.module('movieApp')
.controller('movieSearchCtrl', ["$scope", "imdbService", "myListsService", function($scope, imdbService,myListsService) 
  {
    //used to grab suggestions for what the user is typing
    $scope.getSuggest = function(val) {
      //Send over the value to imdbService
      return imdbService.events({ s: val }).then(function(response) {
        //imd found some matching suggestions
        if(response.data.Search != undefined)
        {
          //Return the matched element
          return response.data.Search.map(function(item){
            return {
              list : item,
              suggest: item.Title
            };
          });
        }
      });
    };
    
    //Select full value of text input
    $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    };
}]);

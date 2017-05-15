angular
.module('movieApp')
.controller('movieSearchCtrl', ["$scope", "imdbService", "myListsService", function($scope, imdbService,myListsService) 
  {
    var paramObj = {};

     if($scope.search === undefined) {
      $scope.async = "";
      $scope.search = "";
      $scope.details ={};
      paramObj = {
        t: $scope.search,
        plot: "full"
      };

      fetch(paramObj);
    }
    //build object to shoot over to imdb
    function fetch(paramObj) {
      paramObj = {
        t: $scope.search,
        plot: "full"
      };
      imdbService.events(paramObj).success(function(resp) { 
        $scope.details = resp; 
        console.log("EVENT RESPONSE: " + resp)
      });
    }

    //used to grab suggestions for what the user is typing
    $scope.getSuggest = function(val) {
      //Send over the value to imdbService
      return imdbService.events({ s: val }).then(function(response) {
        //imd found some matching suggestions
        if(response.data.Search != undefined)
        {
          //Return the matched element
          return response.data.Search.map(function(item){
            console.log(item);
            return {
              list : item,
              suggest: item.Title + " " + item.Year
            };
          });
        }
      });
    };
    //Select full value of text input
    $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    };

    console.log(myListsService);



}]);

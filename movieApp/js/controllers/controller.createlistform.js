angular
  .module('movieApp')
  .controller('createListFormCtrl', ["$scope", "$http", "myListsService", function ($scope, $http, myListsService) {
    $scope.listName = "";
    $scope.movieList = [];

    $scope.addMovieToList = function () {
      $http.get("https://www.omdbapi.com/?t=" + $scope.async.suggest + "&plot=full")
        .then(function (response) {
          if (response.data.Title != "Undefined" && !$scope.containsMovieTitle(response.data.Title, $scope.movieList)) {
            response.data["MyUserRating"] = myListsService.getMovieRating(response.data.Title);
            $scope.movieList.push(response.data);
          } else { alert("That movie is already in your list") }
          $scope.async = "";
        });
    }

    $scope.removeFromList = function (index) {
      $scope.movieList.splice(index, 1);
    }

    $scope.createList = function () {
      if(!$scope.containsListName($scope.listName, myListsService.getMovieLists()))
      {
        if ($scope.listName != "") {
          if ($scope.movieList.length >= 1) 
          {
            myListsService.createList($scope.listName, $scope.movieList);
            $scope.$parent.showMoviesInList(0);
            $scope.$parent.toggleMovieList(0);
            $scope.listName = "";
            $scope.movieList = [];
          }
          else 
          { 
            alert("Add some movies first") 
          }
        }
        else { alert("Enter a list title") }
      }else { alert("You already have a list by this title") }
    }

    $scope.containsMovieTitle = function (obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i].Title === obj) {
          return true;
        }
      }
      return false;
    }
    $scope.containsListName = function (obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i].listName === obj) {
          return true;
        }
      }
      return false;
    }
  }]);

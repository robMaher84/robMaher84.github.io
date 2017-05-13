angular
  .module('movieApp')
  .controller('myMovieListController', ["$scope", "myListsService", "$http", function ($scope, myListsService, $http) {

    $scope.myMoviesLists = myListsService.getMovieLists();
    $scope.selectedList;
    $scope.moviesInSelectedList = [];
    $scope.searchFilter;
    $scope.sortingOption = "Title";
    $scope.averageRating = 0;
    $scope.searchedForMovie = [];

    $scope.addMovieToList = function () {
      $http.get("https://www.omdbapi.com/?t=" + $scope.async.suggest + "&plot=full")
        .then(function (response) {
          if (response.data.Title != "Undefined" && !$scope.containsMovieTitle(response.data.Title, $scope.moviesInSelectedList)) {
            response.data["MyUserRating"] = myListsService.getMovieRating(response.data.Title);
            if (response.data.Poster == "N/A")
              response.data.Poster = "images/na.png";

            $scope.moviesInSelectedList.push(response.data);
            myListsService.addMovieToList(response.data, $scope.selectedList.listName);
            myListsService.saveList();
          } else { alert("That movie is already in your list") }
          $scope.async = "";
        });
    }

    $scope.removeMovieFromList = function (movieName) {
      angular.forEach($scope.selectedList.moviesForList, function (movieObj, key) {
        if (movieObj.Title == movieName) {
          var index = $scope.selectedList.moviesForList.indexOf(movieObj);
          $scope.moviesInSelectedList.splice(index, 1);
          myListsService.removeMovieFromList($scope.selectedList.listName, index);
        }
      });
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

    $scope.showMoviesInList = function (index) {
      $scope.selectedList = [];
      $scope.moviesInSelectedList = [];
      $scope.selectedList = myListsService.getMovieList(index);
      angular.forEach($scope.selectedList.moviesForList, function (value, key) {
        if (value.Poster == "N/A")
          value.Poster = "images/na.png"
        $scope.moviesInSelectedList.push(value);
      });
      $scope.generateAverageRating();
    }

    $scope.generateAverageRating = function () {
      var sum = 0;
      var movieRatingsArray = [];
      angular.forEach($scope.selectedList.moviesForList, function (movie) {
        var s = movie.Ratings[0].Value;
        s = s.substring(0, s.indexOf('/'));
        movieRatingsArray.push(parseFloat(s));
        sum += parseFloat(s);
      });
      $scope.averageRating = sum / movieRatingsArray.length;
      $scope.averageRating = $scope.averageRating.toFixed(2);
    }

    $scope.sortBy = function (sortOption) {
      $scope.sortingOption = sortOption;
    }

    $scope.rateMovie = function (movieName, value) {
      if ($scope.searchedForMovie.Title == movieName) {
        $scope.searchedForMovie.MyUserRating = value
      }
      myListsService.giveMovieRating(movieName, value);
    }

    $scope.grabMovieData = function () {
      $http.get("https://www.omdbapi.com/?t=" + $scope.movieSearch.suggest + "&plot=full")
        .then(function (response) {
          if (response.data.Title != "Undefined") {
            response.data["MyUserRating"] = myListsService.getMovieRating(response.data.Title);
            if (response.data.Poster == "N/A")
              response.data.Poster = "images/na.png";
            $scope.searchedForMovie = response.data;
          } else { alert("Enter a valid movie title") }
          $scope.movieSearch = "";
        });
    }

    $scope.listsToAddMovieTo = [];
    $scope.buildTargetList = function (listName) {
      if ($scope.listsToAddMovieTo.indexOf(listName) !== -1) {
        $scope.listsToAddMovieTo.splice(listName, 1);
      } else
        $scope.listsToAddMovieTo.push(listName);
    }

    $scope.addMovieToLists = function () {
      if ($scope.listsToAddMovieTo.length > 0) {
        angular.forEach($scope.listsToAddMovieTo, function (listName) {
          var keepGoing = true;
          angular.forEach($scope.myMoviesLists, function (baseList) {
            if (keepGoing && listName == baseList.listName && !$scope.containsMovieTitle($scope.searchedForMovie.Title, baseList.moviesForList)) {
              if ($scope.selectedList != undefined && $scope.selectedList.listName) {
                if ($scope.selectedList.listName == listName)
                { $scope.moviesInSelectedList.push($scope.searchedForMovie); }
                myListsService.addMovieToList($scope.searchedForMovie, listName);
              }
            }
            else if (keepGoing && listName == baseList.listName) {
              keepGoing = false;
            }
          });
        });
      }
      else {
        alert("Select a movie to add first!")
      }
      $scope.selectedLists = [];
      $scope.listsToAddMovieTo = [];
    }

    $scope.selectedMultiLists = [];
    $scope.toggleMultiList = function (idx) {
      var pos = $scope.selectedMultiLists.indexOf(idx);
      if (pos == -1) {
        $scope.selectedMultiLists.push(idx);
      } else {
        $scope.selectedMultiLists.splice(pos, 1);
      }
    };
    
    $scope.selectedLists = [];
    $scope.toggleMovieList = function (idx) {
      $scope.selectedLists = [];
      var pos = $scope.selectedLists.indexOf(idx);
      if (pos == -1) {
        $scope.selectedLists.push(idx);
      }
    }
  }]);

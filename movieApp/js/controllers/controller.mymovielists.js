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
    $scope.showLists = true;
    $scope.multiListSelection = false;
    $scope.sortOptions = [{
      name: 'Title',value: 'Title'},
      {name: 'IMDB Rating',value: '-Ratings[0].Value'},
      {name:'Rotten Tomatoes', value:'-Ratings[1].Value'},
      {name:'Metacritic', value:'-Ratings[2].Value'},
      {name:'Country', value:'Country'},
      {name:'Metascore', value:'Metascore'},
      {name:'Genre', value:'Genre'},
      {name:'Rated', value:'Rated'},
      {name:'Release Year', value:'Year'}
      ];
    $scope.selectedSort = $scope.sortOptions[0];
    $scope.init = function(){
          if($scope.myMoviesLists.length > 0)
          {
            $scope.showMoviesInList(0);
            $scope.toggleMovieList(0);
          }
    }
    $scope.returnAverageRating = function(list){
      var sum = 0;
      var movieRatingsArray = [];
      angular.forEach(list, function (movie) {
        if(movie.Ratings[0] != undefined)
        {
          var s = movie.Ratings[0].Value;
          s = s.substring(0, s.indexOf('/'));
          movieRatingsArray.push(parseFloat(s));
          sum += parseFloat(s);
        }
      });
      if(!isNaN(sum / movieRatingsArray.length))
      return (sum / movieRatingsArray.length).toFixed(2) + "/10";
      else
      return "N/A";
    }

    $scope.addMovieToList = function (target) {
      $http.get("https://www.omdbapi.com/?t=" + $scope.movieViewSearch.suggest + "&plot=full")
        .then(function (response) {
          if (response.data.Title != "Undefined" && !$scope.containsMovieTitle(response.data.Title, $scope.moviesInSelectedList)) {
            response.data["MyUserRating"] = myListsService.getMovieRating(response.data.Title);
            if (response.data.Poster == "N/A")
              response.data.Poster = "images/na.png";
            $scope.moviesInSelectedList.push(response.data);
            myListsService.addMovieToList(response.data, $scope.selectedList.listName);
            myListsService.saveList();
          } else { alert("That movie is already in your list") }
          $scope.movieViewSearch = "";
        });
    }
   
    $scope.removeMovieFromList = function (movieName) {
      angular.forEach($scope.selectedList.moviesForList, function (movieObj, key) {
        if (movieObj.Title == movieName) {
          var index = $scope.selectedList.moviesForList.indexOf(movieObj);
          $scope.moviesInSelectedList.splice(index, 1);
          myListsService.removeMovieFromList($scope.selectedList.listName, index);
          $scope.generateAverageRating();
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
          value.Poster = "images/na.png";
        $scope.moviesInSelectedList.push(value);
      });
      $scope.generateAverageRating();
      $scope.selectedSort = $scope.sortOptions[0];
    }



    $scope.generateAverageRating = function () {
      var sum = 0;
      var movieRatingsArray = [];
      angular.forEach($scope.selectedList.moviesForList, function (movie) {
        if(movie.Ratings[0] != undefined)
        {
          var s = movie.Ratings[0].Value;
          s = s.substring(0, s.indexOf('/'));
          movieRatingsArray.push(parseFloat(s));
          sum += parseFloat(s);
        }
      });
      $scope.averageRating = sum / movieRatingsArray.length;
      $scope.averageRating = $scope.averageRating.toFixed(2);
    }

    $scope.sortBy = function (sortOption) {
      $scope.sortingOption = sortOption;
    }

    $scope.rateMovie = function (movieName, value) {
      if ($scope.searchedForMovie.Title == movieName) {
        $scope.searchedForMovie.MyUserRating = value;
      }
      myListsService.giveMovieRating(movieName, value);
    }

    $scope.grabMovieData = function () {
      $http.get("https://www.omdbapi.com/?t=" + $scope.movieSearch.suggest + "&plot=full")
        .then(function (response) {
          if (response.data.Title != "Undefined") {
            response.data["MyUserRating"] = myListsService.getMovieRating(response.data.Title);
            $scope.searchedForMovie = response.data;
            if (response.data.Poster == "N/A")
              response.data.Poster = "images/na.png";
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
      if($scope.searchedForMovie.length != 0 && $scope.searchedForMovie != undefined)
      {
        if ($scope.listsToAddMovieTo.length > 0) 
        {
          angular.forEach($scope.listsToAddMovieTo, function (listName, index) 
          {
            var keepGoing = true;
            angular.forEach($scope.myMoviesLists, function (baseList) {
              if (keepGoing && listName == baseList.listName && !$scope.containsMovieTitle($scope.searchedForMovie.Title, baseList.moviesForList)) 
              {
                if ($scope.selectedList != undefined ) 
                {
                  if ($scope.selectedList.listName == listName)
                  { 
                    $scope.moviesInSelectedList.push($scope.searchedForMovie); 
                  }
                }
                myListsService.addMovieToList($scope.searchedForMovie, listName);
                alert("Movie added to " + listName);
                if(index == $scope.listsToAddMovieTo.length-1)
                {
                  $scope.multiListSelection = !$scope.multiListSelection;
                }
              }
              else if (keepGoing && listName == baseList.listName) 
              {
                keepGoing = false;
                alert("That movie is already in " + baseList.listName);
              }
            });
          });
        }else{alert("Select some lists")}
      }else{alert("Search for a movie")}
      
      $scope.selectedMultiLists = [];
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

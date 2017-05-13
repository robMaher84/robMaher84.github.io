
angular
	.module('movieApp')
	.factory('myListsService', function () {
		// Retrieve the object from storage
		var myListFactory = {};
		var myLists = [];
		var storageName = "abc1";
		myListFactory.movieRating;
		myListFactory.myLists = angular.fromJson(localStorage.getItem(storageName));

		if (myListFactory.myLists == null) {
			myListFactory.myLists = [];
			localStorage.setItem(storageName, angular.toJson(myListFactory.myLists));
		}

		myListFactory.createList = function (listName, moviesForList) {
			JSON.parse(myListFactory.myLists.push({ listName, moviesForList }));
			localStorage.setItem(storageName, angular.toJson(myListFactory.myLists));
		}
		
		myListFactory.getMovieLists = function () {
			return myListFactory.myLists;
		}

		myListFactory.saveList = function () {
			localStorage.setItem(storageName, angular.toJson(myListFactory.myLists));
		}

		myListFactory.addMovieToList = function (movieName, listName) {
			angular.forEach(myListFactory.myLists, function (list) {
				if (list.listName == listName) {
					list.moviesForList.push(movieName);
				}
			});
			myListFactory.saveList();
		}

		myListFactory.removeMovieFromList = function (listName, movieIndex) {
			angular.forEach(myListFactory.myLists, function (list) {
				console.log(list);
				if (list.listName == listName) {
					list.moviesForList.splice(movieIndex, 1);
					myListFactory.saveList();
				}
			});
		}

		myListFactory.getMovieList = function (index) {
			return myListFactory.myLists[index];
		}

		myListFactory.getMovieRating = function (movieName) {
			var myRating = "Unrated";
			angular.forEach(myListFactory.myLists, function (list) {
				angular.forEach(list.moviesForList, function (movie) {
					if (movieName == movie.Title && movie.MyUserRating != undefined) {
						myRating = movie.MyUserRating;
					}
				});
			});
			return myRating;
		}

		myListFactory.giveMovieRating = function (movieName, value) {
			angular.forEach(myListFactory.myLists, function (lists) {
				angular.forEach(lists.moviesForList, function (movie) {

					if (movieName == movie.Title) {
						movie["MyUserRating"] = value;
						localStorage.setItem(storageName, angular.toJson(myListFactory.myLists));
					}
				});
			});
		}
		return myListFactory;
	});

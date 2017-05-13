angular
.module('movieApp')
.directive('movieSearch', function () {
    return {
        template: '<input type="text" typeahead-on-select="addMovieToList()" ng-model="async" onclick="select()" placeholder="Enter Movie Name" uib-typeahead="result as result.suggest for result in getSuggest($viewValue)" typeahead-min-length="3" autofocus>'
    };
});
angular
.module('movieApp')
.directive('movieSearch', function () {
    return {
        template: '<div class="input-group"><span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></span><input  class="form-control" aria-describedby="basic-addon1" type="text" typeahead-on-select="addMovieToList(async)" ng-model="async" onclick="select()" placeholder="Enter Movie Name" uib-typeahead="result as result.suggest for result in getSuggest($viewValue)" typeahead-min-length="3" autofocus></div>'
    };
});
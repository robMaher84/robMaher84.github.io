
angular
.module('movieApp')
.factory('myListsService', function(){
	// Retrieve the object from storage
	var myLists = localStorage.getItem('myListData');
	if(myLists == null)
	{
		myLists = {}
		localStorage.setItem('myListData', JSON.stringify(myLists));
		console.log('myListService: List not found, created: ', JSON.parse(myLists));
	}else
	{
		console.log('myListService: List found: ', JSON.parse(myLists));
	}

	function addListItem(item){
		myLists.push(item);
	}

	console.log('USER LIST OBJ: ', JSON.parse(myLists));
	return myLists;
});
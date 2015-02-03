$(document).ready(onReady);

function onReady() {

	function imdbSearch(query) {

		$.get(
			'http://www.omdbapi.com',
			{
				s: query
			},
			onSearchResults,
			'json'
		);
	}

	function onSearchResults(data) {


			for(var key in data.Search){
				var rowTemplate = _.template('<tr><td><%= Title %></td></tr>');
				$('#table-data').append(rowTemplate(data.Search[key]));
			}

		$('tr').on('click', onTdClick);
		function onTdClick() {
			// var stuff = $(this).html();
			$(this).appendTo($('#watch-list'));
			console.log("This and inner: " + $(this).html());
			console.log("Type of this.html :" + typeof $(this).html());

			postWatchList($(this).html());
		}
		$('').on('click', onTdClickWatched);
		function onTdClickWatched() {
			$(this).appendTo($('#watched-list'));
			// localStorage.setItem("watchedList", JSON.stringify(data.Search[key]));
		}
	}
	function postWatchList(data) {
		$.post(
			'http://tiny-pizza-server.herokuapp.com/collections/austinfe-alex',
			{
				name: data,
			},
			function(messages) {
				console.log(messages);
			},
			'json'
		);
	}

	// 1. Event listener
	$('#search-button').on('click', onSearchButtonClick);

	function onSearchButtonClick() {
		// 1. Input value
		var searchTerm = $('#search-box').val();
		imdbSearch(searchTerm);
	}


	// var watchList = JSON.parse(localStorage.getItem("watchList"));
	// $('<span>'+watchList+'</span>').appendTo('#watch-list');

	// var watchedList = JSON.parse(localStorage.getItem("watchedList"));
	// $('<span>'+watchedList+'</span>').appendTo('#watched-list');
}


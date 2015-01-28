$(document).ready(onReady);

function onReady() {
	// 1. Event listener
	// $('#search-button').on('click', onSearchButtonClick);

	// function onSearchButtonClick() {
	// 	// 1. Input value
	// 	console.log($('#search-box').val());
	// }


	// var myName = 'Aaron';
	// var myNewHtml = 'Hi there, <strong>'+myName+'</strong>. How\'s your day going?';
	// $('#results').html(myNewHtml);

	// var myButton = document.getElementById('search-button');
	// myButton.addEventListener('click', onSearchButtonClick);

	// function onSearchButtonClick() {
	// 	console.log('hey my search button was clicked');
	// }


	function imdbSearch(query) {

		$.get(
			'http://www.omdbapi.com',
			{
				s: query
				// y: year,
				// type: type,
				// tomatoes: tomatoes
			},
			onSearchResults,
			'json'
		);
	}

	// function tomatoMeter(x) {

	// 	$.get(
	// 		'http://www.omdbapi.com',
	// 		{
	// 			i: x,
	// 			tomatoes: true
	// 		},
	// 		onTomatoResults,
	// 		'json'
	// 	);
	// }

	function onSearchResults(data) {

		console.log(data);
		// i = 0;
		// for (var i = 0; i < 10; i++) {

		// 	$('#table-data').append("<tr class=\"movie\"><td>" + data.Search[i].Title + "</td>" + "<td>" + data.Search[i].Year + "</td></tr>");
		// }

			for(var key in data.Search){
				var rowTemplate = _.template('<tr><td><%= Title %></td></tr>');
				// data.Search[key].ref = key;
				$('#table-data').append(rowTemplate(data.Search[key]));
				// $('#movies').append(rowTemplate({Title: 'Benji', Year: 1984, Genre: 'Childrens'}));
				// console.log(JSON.stringify(data.Search[key]));
			}
			$('tr').on('click', onTdClick);
			function onTdClick() {
				$(this).appendTo($('#watch-list'));

			localStorage.setItem("watchList", JSON.stringify(data.Search[key]));
			// localStorage.setItem(JSON.stringify($(this.innerText)));
			// localStorage.setItem($(this), dojox.json.ref.toJson($(this)));
			$(this).on('click', onTdClickWatched);
			function onTdClickWatched() {
				$(this).appendTo($('#watched-list'));
				localStorage.setItem("watchedList", JSON.stringify(data.Search[key]));
			}
		}

	}
// "<th>" + data.Search[counter].Title + "</th>"
	// function onTomatoResults(data) {
	// 	console.log('onTomatoResults');
	// 	console.log(data);
	// 	console.log(data.Genre);
	// }

	// var searchTerm = $('#search-box').val();
	// var year = 1972;
	// var type = 'movie';
	// var tomatoes = true;

	// 1. Event listener
	$('#search-button').on('click', onSearchButtonClick);

	function onSearchButtonClick() {
		// 1. Input value
		var searchTerm = $('#search-box').val();
		imdbSearch(searchTerm);
	}

	//Hard Mode: Update your results box to allow your user to click on a result to
	//add it to another list of movies that they want to watch (their "to watch" list).
	// var movieId = document.getElementById('movie');

	// $('#movie').click(function(){
	// 	// table-data.innerHTML = table-data.innerHTML + this.innerHTML;
	// 	$('#watch-list').innerHTML = $('#watch-list').innerHTML + $(this.innerHTML);
	// 	console.log('you clicked me');
	// });

	// $('tr').on('click', onTdClick);

	// function onTdClick() {
	// 	// $(this).appendTo($('#watch-list'));
	// 	console.log('you clicked me');
	// }

	// $("#watch-list").val(localStorage.getItem("searchResponse"));
	// $("watch-list").append(localStorage.searchResponse);
	// return localStorage.getItem("searchResponse");
	// function load_data() {
	//   var input = document.getElementById("watch-list");
	//   input.value = localStorage.getItem("searchResponse");
	//   console.log('loading data');
	// }

	// load_data();

	var watchList = JSON.parse(localStorage.getItem("watchList"));
	$('<span>'+watchList+'</span>').appendTo('#watch-list');

	var watchedList = JSON.parse(localStorage.getItem("watchedList"));
	$('<span>'+watchedList+'</span>').appendTo('#watched-list');
}


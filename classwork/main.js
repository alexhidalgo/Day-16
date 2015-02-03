$(document).ready(function(){

	var userName = prompt('Please enter your name.');

	//Toggle dropdown Menu
	$('.dropdown-toggle').dropdown();

	//Refresh Messages in Message Board
	$('.refresh-messages').on('click', function () {
	  $('.message-board').html('');
	});

	//Logout User and Return New Prompt
	$('.logout-user').on('click', function () {
	  userName = prompt('Please enter your name.');
	});

	function getMessages() {
		$.get(
			'http://tiny-pizza-server.herokuapp.com/collections/austinfe',
			function(messages) {
				render(messages);
				console.log(messages);
			},
			'json'
			);
	}

	function postMessages() {
		var now = timeStamp();
		$.post(
			'http://tiny-pizza-server.herokuapp.com/collections/austinfe',
			{
				name: userName,
				message: $('.message-box').val(),
				time: now,
			},
			function(messages) {
				console.log(messages);
			},
			'json'
		);
	}

	var render = function(messages) {
		var messageRow = _.template('<li class="right clearfix"><span class="chat-img pull-right"><img src="https://graph.facebook.com/ajhidalgo/picture?width=35&height=35" alt="User Avatar" class="img-circle"></span><div class="chat-body clearfix"><div class="header"><small class=" text-muted"><span class="glyphicon glyphicon-time"></span><%= time %></small><strong class="pull-right primary-font"><%= name %></strong></div><p><%= message %></p></div></li>');
		$('.message-board').html('');
		for(var i=0; i<messages.length; i++) {
			if(messages[i].message && messages[i].name && messages[i].time) {
				$('.message-board').append(messagesRow(messages[i]));
			}
		}
		console.log(userName);
		console.log(name);
	};


	$('.send-button').click(function() {
		postMessages();
		$('.message-box').val('');
	});

	setInterval(getMessages, 1000);

	function timeStamp() {
	// Create a date object with the current time
	  var now = new Date();

	// Create an array with the current month, day and time
	  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

	// Create an array with the current hour, minute and second
	  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

	// Determine AM or PM suffix based on the hour
	  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

	// Convert hour from military time
	  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

	// If hour is 0, set it to 12
	  time[0] = time[0] || 12;

	// If seconds and minutes are less than 10, add a zero
	  for ( var i = 1; i < 3; i++ ) {
	    if ( time[i] < 10 ) {
	      time[i] = "0" + time[i];
	    }
	  }

	// Return the formatted string
	  return date.join("/") + " " + time.join(":") + " " + suffix;
	}

});

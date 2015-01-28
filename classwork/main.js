$(document).ready(function(){

	var userName = prompt('Please enter your name.');

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
		$.post(
			'http://tiny-pizza-server.herokuapp.com/collections/austinfe',
			{
				 message: $('#message-box').val(),
				 name: userName,
			},
			function(messages) {
				console.log(messages);
			},
			'json'
		);
	}

	var render = function(messages) {
		var messageRow = _.template('<div class="row"><div><%= message %></div><div><%= name %></div></div>');
		$('#message-board').html('');
		for(var i=0; i<messages.length; i++) {
			if(messages[i].message && messages[i].name) {
				$('#message-board').append(messageRow(messages[i]));
			}
		}
	};


	$('#send-button').click(function() {
		postMessages();
	});

	setInterval(getMessages, 5000);
});

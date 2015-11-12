var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var voteMessage = document.getElementById('vote-message');
var voteTally = document.getElementById('vote-tally');
var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

socket.on('userConnection', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

socket.on('voteMessage', function (message) {
  voteMessage.innerText = message;
});

socket.on('voteCount', function (votes) {
  var result = '';
   for (var choice in votes) {
    result = result + choice + ': ' + votes[choice] + ' ';
  }

  voteTally.innerText = 'Tallied Votes' + ': ' + result;
});

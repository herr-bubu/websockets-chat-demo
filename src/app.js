window.onload = function() {
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messageList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');
  var socket = new WebSocket('ws://echo.websocket.org');

  socket.onopen = function(event) {
    socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.URL;
    socketStatus.className = 'open';
  };
  
  socket.onmessage = function(event) {
    const message = event.data;
    messageList.innerHTML += '<li class="received"><span>Received:</span>' + message + '</li>';
  };

  socket.onclose = function(event) {
    socketStatus.innerHTML = 'Disconnected from Websocket';
    socketStatus.className = 'closed';
  };

  closeBtn.onclick = function(e) {
    e.preventDefault();
    socket.close();
    return false;
  };

  form.onsubmit = function(e) {
    e.preventDefault();

    var message = messageField.value;

    socket.send(message);

    messageList.innerHTML += '<li class="sent"><span>Sent:</span>' + message + '</li>';

    messageField.value = '';

    return false;
  };
};

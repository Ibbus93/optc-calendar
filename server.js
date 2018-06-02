const express = require('express');
const http = require('http');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 3500;
app.set('port', port);

const server = http.createServer(app);

var io = require('socket.io').listen(server);

/*io.on('connection', (socket) => {
  socket.emit('datetime', { datetime: new Date().getTime() });
  console.log("connected with datetime emitted");
});*/

io.on('connection', (socket) => {
  // console.log('Giving time');

  options = {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  formatter = new Intl.DateTimeFormat([],options);

  // socket.emit('datetime', { datetime: formatter.format(new Date()) });
  // console.log(formatter.format(new Date()));
  //
  // socket.on('event1', (data) => {
  //   console.log(data.msg);
  // });
  //
  // socket.emit('event2', {
  //   msg: 'Server to client, do you read me? Over.'
  // });
  //
  // socket.on('event3', (data) => {
  //   console.log(data.msg);
  //   socket.emit('event4', {
  //     msg: 'Loud and clear :)'
  //   });
  // });
});


server.listen(port, () => console.log('running'));

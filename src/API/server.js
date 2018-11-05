const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const PORT = process.env.PORT || 8080;

const uuidv4 = require('uuid/v4');
let activeUsers = [];

app.use('/', express.static(__dirname + '/../../build'));

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  socket.emit('getUsersList', activeUsers);

  socket.on('getUsersList', () => {
    socket.emit('setUsersList', activeUsers)
  });

  socket.on('newActiveUser', (userName) => {
    let checkIfUserNameExists = activeUsers.find(u => u.userName === userName);

    if (checkIfUserNameExists) {
      let verified = false;
      socket.emit('setUser', verified)
    } else {
      let userId = uuidv4();
      let user = { userName: userName, userId: userId }
      activeUsers.push(user);
      let verified = true;

      socket.emit('setUser', verified, userId);
      io.sockets.emit('setUsersList', activeUsers);
    }
  })

  socket.on('message', (data) => {
    io.sockets.emit('message', data);
  });

  socket.on('close', (userId) => {
    activeUsers = activeUsers.filter(user => {
      return user.userId !== userId;
    });

    io.sockets.emit('setUsersList', activeUsers);
  });
});


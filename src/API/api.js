import io from 'socket.io-client';

let socket;

const port = process.env.NODE_ENV === 'prod' ? '' : 'http://localhost:8000';

export const api = {
  open: () => {
    socket = io(port);
  },

  send: (message) => {
    socket.emit('message', message)
  },

  listen: (handleMessages) => {
    socket.on('message', (data) => {
      handleMessages(data);
    })
  },

  newActiveUser: (userName) => {
    socket.emit('newActiveUser', userName);
  },

  checkIfUserExists: (checkStatus) => {
    socket.on('userExists', () => {
      checkStatus();
    });
  },

  getUsersList: () => {
    socket.emit('getUsersList');
  },

  showUsersList: (usersList) => {
    socket.on('setUsersList', usersList);
  },

  getUserId: (verified, userId) => {
    socket.on('setUser', verified, userId);
  },

  close: (userId) => {
    socket.emit('close', userId);
  }
}

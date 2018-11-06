import io from 'socket.io-client';

let socket;

export const api = {
  open: () => {
    socket = io();
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

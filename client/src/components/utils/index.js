import io from 'socket.io-client';

const socket = io.connect('http://192.168.1.105:5000/');

export const isLogin = {
  isAuthenticated: false,
  authenticate(cb) {
    socket.emit('isLogin', '1234');
    socket.on('isLogin', ({ isLogin }) => {
      if (isLogin) {
        this.isAuthenticated = true;
        cb('Im the callback');
      }
      this.isAuthenticated = false;
      cb('Im the callback');
    });
  }
};

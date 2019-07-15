export const isLogin = {
  isAuthenticated: false,
  authenticate(data, cb) {
    // socket.emit('isLogin', '1234');
    // socket.on('isLogin', ({ isLogin }) => {
    //   if (isLogin) {
    //     this.isAuthenticated = true;
    //     cb('Im the callback');
    //   }
    //   this.isAuthenticated = false;
    //   cb('Im the callback');
    // });

    // fetch('http://localhost:3000/secret', { credentials: 'include' })
    //   .then(res => res.json())
    //   .then(data => (this.isAuthenticated = data.isLogin))
    //   .then(() => cb());

    fetch('/authenticate', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.isAuthenticated = true;
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .then(() => cb())
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  }
};

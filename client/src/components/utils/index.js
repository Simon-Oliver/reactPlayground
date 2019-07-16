export const isLogin = {
  isAuthenticated: false,
  authenticate(data, cb) {
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

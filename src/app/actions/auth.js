import { AUTHENTICATED, NOT_AUTHENTICATED } from '.';

const setToken = (token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('lastLoginTime', new Date(Date.now()).getTime());
};

const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const ninetyMinutes = 1000 * 60 * 90;
  const timeSinceLastLogin = now - localStorage.getItem('lastLoginTime');
  if (timeSinceLastLogin < ninetyMinutes) {
    return localStorage.getItem('token');
  }
  return false;
};

export const signupUser = (credentials) => (dispatch) => fetch('http://localhost:3001/signup', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user: credentials })
}).then((res) => {
  if (res.ok) {
    setToken(res.headers.get('Authorization'));
    return res
      .json()
      .then((userJson) => dispatch({ type: AUTHENTICATED, payload: userJson }));
  }
    return res.json().then((errors) => {
      dispatch({ type: NOT_AUTHENTICATED });
      return Promise.reject(errors);
    });
});

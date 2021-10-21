import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGN_UP = 'SIGNUP';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
const axios = require('axios');

export const authenticate = (userId, token) => {
  return dispatch => {
    dispatch({type: AUTHENTICATE, userId: userId, token: token});
  };
};

export const signUp = (email, password) => {
  return async dispatch => {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkQVe_67wBCAacoToaQFj5d8xzXBSi1DM',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    );
    dispatch(authenticate(response.data.localId, response.data.idToken));
    saveDataToStorage(response.data.idToken, response.data.localId);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkQVe_67wBCAacoToaQFj5d8xzXBSi1DM',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    );
    dispatch(authenticate(response.data.localId, response.data.idToken));
    saveDataToStorage(response.data.idToken, response.data.localId);
  };
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
    }),
  );
};

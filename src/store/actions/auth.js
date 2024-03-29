import axios from 'axios';

import { startFormLoading, stopFormLoading } from './ui';
import { setUser } from './user';

export const tryAuth = authData => {
  return dispatch => {
    dispatch(startFormLoading());
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const request = await axios.post('/api/user/login', authData);
        resolve(request.data);
        dispatch(stopFormLoading());
      } catch (e) {
        dispatch(stopFormLoading());
        reject(e.response);
      }
    });
  };
};

export const registerUser = authData => {
  return dispatch => {
    dispatch(startFormLoading());
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const request = await axios.post('/api/user/register', authData);
        resolve(request.data);
        dispatch(stopFormLoading());
      } catch (e) {
        dispatch(stopFormLoading());
        reject(e.response);
      }
    });
  };
};

export const getUser = () => {
  return dispatch => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const request = await axios.get('/api/user/auth');
        dispatch(setUser(request.data));
        resolve(request.data);
      } catch (e) {
        console.log(e.response);
        reject(e.response);
      }
    });
  };
};

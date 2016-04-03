import { checkHttpStatus, parseResponse } from 'utilities';
import { authConstants as authConstants } from 'constants/auth';
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode';

function signInUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: authConstants.SIGN_IN_USER_SUCCESS,
    payload: {
      token
    }
  };
};

function signInUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: authConstants.SIGN_IN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
};

function signInUserRequest() {
  return {
    type: authConstants.SIGN_IN_USER_REQUEST
  };
};

function signOut() {
  localStorage.removeItem('token');
  return {
    type: authConstants.SIGN_OUT_USER
  };
};

export function signOutAndRedirect() {
  return (dispatch, state) => {
    dispatch(signOut());
    dispatch(push('/login'));
  };
};

export function signInUser(email, password, redirect='/') {
  return function(dispatch) {
    dispatch(signInUserRequest());
    return fetch('http://localhost:3001/api/auth/token/', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(checkHttpStatus)
    .then(parseResponse)
    .then(response => {
      try {
        let decoded = jwtDecode(response.data.token);
        dispatch(signInUserSuccess(response.data.token));
        dispatch(push(redirect));
      } catch (e) {
        dispatch(signInUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid password.'
          }
        }));
      }
    })
    .catch(error => {
      dispatch(signInUserFailure(error));
    });
  };
};

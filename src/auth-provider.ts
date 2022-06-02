/**
 * If we use Firebase or other auth services, we don't need this file
 */
import {User} from "./types/user";

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = '__auth_provider_token__';

/*
* How: send username and password to backend; then handle response
* */
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

/*
* How: put token into localStorage
*/
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user;
};

/*
* How: get token from localStorage
*/
export const getToken = () => window.localStorage.getItem(localStorageKey);

/*
* How: send username and password to backend; then handle response
*/
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

/*
* How: remove token from localStorage
*/
export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};

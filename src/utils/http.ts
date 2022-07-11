import qs from 'qs';
import * as auth from 'auth-provider';
import {useAuth} from '../context/auth-context';
import {useCallback} from "react";
const axios = require('axios').default;

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

interface AxiosConfig {
  method: 'GET' | 'POST',
  url: string,
  headers?: object;
  data?: object;
  params?: object;
}

/*
* a function to send an HTTP request; log out if "401: Unauthorized"
* */
// export const http = async (
//   endpoint: string,
//   {data, token, headers, ...customConfig}: Config = {}
// ) => {
//   const config = {
//     // default method: 'GET'
//     method: 'GET',
//     headers: {
//       Authorization: token ? `Bearer ${token}` : '',
//       'Content-Type': data ? 'application/json' : '',
//     },
//     // may override the default method
//     ...customConfig,
//   };
//
//   if (config.method.toUpperCase() === 'GET') {
//     endpoint += `?${qs.stringify(data)}`;
//   } else {
//     config.body = JSON.stringify(data || {});
//   }
//
//   // axios will throw an error when status code is not 2xx
//   return window
//     .fetch(`${apiUrl}/${endpoint}`, config)
//     .then(async (response) => {
//       // 401: Unauthorized
//       if (response.status === 401) {
//         await auth.logout();
//         window.location.reload();
//         return Promise.reject({message: 'Try again.'});
//       }
//
//       const data = await response.json();
//       if (response.ok) {
//         return data;
//       } else {
//         // need this!
//         return Promise.reject(data);
//       }
//     });
// };

export const http = async (
  endpoint: string,
  {data, token, headers, ...customConfig}: Config = {}
) => {
  const config = {
    // default method: 'GET'
    method: 'GET',
    url: `${apiUrl}/${endpoint}`,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    // may override the default method
    ...customConfig,
  } as AxiosConfig;

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
    config.url = `${apiUrl}/${endpoint}`;
  } else {
    config.data = data || {}
  }

  // axios will throw an error when status code is not 2xx
  // TODO
  return await axios(config)
    // @ts-ignore
    .then((response) => {
      return response.data;
    })
    .catch(async (error: any) => {
        if (error.response.status === 401) {
          await auth.logout();
          window.location.reload();
          return Promise.reject({message: 'Try again.'});
        } else {
          console.log(error.response.data);
          return Promise.reject(error.response.data);
      }
      }
    )
};

/*
* a function to return a function that can send an HTTP request with config and user token
* */
export const useHttp = () => {
  const {user} = useAuth();
  return useCallback(async (...[endpoint, config]: Parameters<typeof http>) =>
    await http(endpoint, {...config, token: user?.token}),
    [user?.token]);
};

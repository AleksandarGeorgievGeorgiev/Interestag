import React, { useState, useContext } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { UserContext } from "../user-context/UserContextProvider";
import { useRefreshToken } from "../user-context/useRefreshToken";

const useProtectedApi = () => {
  const { isJwtFresh } = useContext(UserContext);
  const refreshToken = useRefreshToken();
  const navigationHistory = useHistory();

  const normalizeUrl = (url) => {
    if(!url.startsWith('http')) {
      return `${process.env.REACT_APP_BASEURL}${url}`;
    }

    return url;
  }

  const authorizeRequest = async () => {
    if (!isJwtFresh()) {
      return refreshToken()
        .then((res) => { return Promise.resolve(res); })
        .catch((err) => {
          navigationHistory.push("/login/");

          return Promise.reject(err);
        });
    }

    return Promise.resolve();
  }

  const makeRequest = async (httpMethod, { url, data, options }) => {
    const endpoint = normalizeUrl(url);
    const optionsWithCredentials = { ...options, withCredentials: true }

    return authorizeRequest()
      .then(res => {
        switch(httpMethod.toUpperCase()) {
          case 'GET': return axios.get(endpoint, optionsWithCredentials);
          case 'POST': return axios.post(endpoint, data, optionsWithCredentials);
          case 'PUT': return axios.put(endpoint, data, optionsWithCredentials);
          case 'PATCH': return axios.patch(endpoint, data, optionsWithCredentials);
          case 'DELETE': return axios.delete(endpoint, data, optionsWithCredentials);
          case 'OPTIONS': return axios.options(endpoint, optionsWithCredentials);
          case 'HEAD': return axios.head(endpoint, optionsWithCredentials);
        }
      })
      .catch(err => Promise.reject(err));
  }

  const apiGet = (url, options) => {
    return makeRequest('GET', { url, options });
  }

  const apiPost = (url, data, options) => {
    return makeRequest('POST', { url, data, options });
  }

  const apiPut = (url, data, options) => {
    return makeRequest('PUT', { url, data, options });
  }

  const apiPatch = (url, data, options) => {
    return makeRequest('PATCH', { url, data, options });
  }

  const apiDelete = (url, data, options) => {
    return makeRequest('DELETE', { url, data, options });
  }

  const apiOptions = (url, options) => {
    return makeRequest('OPTIONS', { url, options });
  }

  const apiHead = (url, options) => {
    return makeRequest('HEAD', { url, options });
  }

  return {
    get: apiGet,
    post: apiPost,
    put: apiPut,
    patch: apiPatch,
    delete: apiDelete,
    options: apiOptions,
    head: apiHead,
  }
}

export { useProtectedApi };
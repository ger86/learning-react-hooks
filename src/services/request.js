// @flow
import queryString from 'query-string';
import { API_URL } from 'config/consts';
import ApiError from 'utils/ApiError';

function Request() {}

Request.prototype.handleResponse = async function handleResponse(
  response: Response
) {
  const responseJson = await response.json();
  if (response.ok) {
    return responseJson;
  }
  const apiError = new ApiError(response.status, responseJson.message);
  throw apiError;
};

Request.prototype.sendRequest = async function sendRequest(
  method: string,
  path: string,
  query: {},
  body: {}
) {
  let url = `${API_URL}/${path}`;
  if (query) {
    url = `${url}?${queryString.stringify(query)}`;
  }
  const options = {
    ...{
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  };
  const response = await fetch(url, options);
  return this.handleResponse(response);
};

Request.prototype.get = async function get(path: string, query: ?{}) {
  return this.sendRequest('GET', path, query);
};

Request.prototype.post = async function post(path: string, data: {}) {
  return this.sendRequest('POST', path, null, data);
};

Request.prototype.patch = async function patch(path: string, data: {}) {
  return this.sendRequest('PATCH', path, null, data);
};

const request = new Request();

export default request;

import queryString from 'query-string';
import { API_URL } from 'config/consts';
import ApiError from 'utils/ApiError';

class Request {
  public async handleResponse(response: Response) {
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson;
    }
    const apiError = new ApiError(response.status, responseJson.message);
    throw apiError;
  }

  public async sendRequest(method: string, path: string, query?: {} | null, body: {} = {}) {
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
      ...(body && (method !== 'GET') ? { body: JSON.stringify(body) } : {})
    };
    const response = await fetch(url, options);
    return this.handleResponse(response);
  }

  public async get(path: string, query?: {}) {
    return this.sendRequest('GET', path, query);
  }

  public async post(path: string, data: {}) {
    return this.sendRequest('POST', path, null, data);
  };

  public async patch(path: string, data: {}) {
    return this.sendRequest('PATCH', path, null, data);
  };
}

const request = new Request();

export default request;

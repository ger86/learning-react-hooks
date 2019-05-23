import request from 'services/request';

export const getUsers = async page => request.get('users', { page });
export const getUser = async userId => request.get(`users/${userId}`);
export const postUser = async user => request.post(`users`, user);
export const patchUser = async user => request.patch(`users/${user.id}`, user);

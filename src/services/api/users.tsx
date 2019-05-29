import request from 'services/request';
import { User } from 'types/User';

export const getUsers = async (page: number | string) => request.get('users', { page });
export const getUser = async (userId: number | string) => request.get(`users/${userId}`);
export const postUser = async (user: User) => request.post(`users`, user);
export const patchUser = async (user: User) =>
  request.patch(`users/${user.id}`, user);

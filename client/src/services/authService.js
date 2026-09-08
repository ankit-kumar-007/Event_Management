import api from './api';

export const registerRequest = async ({ name, email, password, role }) => {
  const { data } = await api.post('/auth/register', { name, email, password, role });
  return data; // { success, token, user }
};

export const loginRequest = async ({ email, password }) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data; // { success, token, user }
};

export const getMeRequest = async () => {
  const { data } = await api.get('/auth/me');
  return data.user;
};

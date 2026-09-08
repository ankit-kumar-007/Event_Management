import api from './api';

// Public: list events with optional category/search filters + pagination
export const fetchEvents = async ({ category, search, page = 1, limit = 9 } = {}) => {
  const params = {};
  if (category) params.category = category;
  if (search) params.search = search;
  params.page = page;
  params.limit = limit;

  const { data } = await api.get('/events', { params });
  return data; // { success, events, pagination }
};

export const fetchEventById = async (id) => {
  const { data } = await api.get(`/events/${id}`);
  return data.event;
};

// Organizer-only
export const fetchMyEvents = async () => {
  const { data } = await api.get('/events/organizer/mine');
  return data.events;
};

export const createEventRequest = async (payload) => {
  const { data } = await api.post('/events', payload);
  return data.event;
};

export const updateEventRequest = async (id, payload) => {
  const { data } = await api.put(`/events/${id}`, payload);
  return data.event;
};

export const deleteEventRequest = async (id) => {
  await api.delete(`/events/${id}`);
};

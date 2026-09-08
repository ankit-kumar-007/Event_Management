export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ROLES = {
  ORGANIZER: 'organizer',
  USER: 'user',
};

// Keep in sync with server/src/models/Event.js -> CATEGORIES
export const CATEGORIES = [
  { value: 'tech', label: 'Tech', accent: '#3E63FF' },
  { value: 'cultural', label: 'Cultural', accent: '#D6486E' },
  { value: 'sports', label: 'Sports', accent: '#1E9E6B' },
  { value: 'workshop', label: 'Workshop', accent: '#C48A00' },
  { value: 'music', label: 'Music', accent: '#7C5CFC' },
  { value: 'business', label: 'Business', accent: '#0E8C82' },
  { value: 'other', label: 'Other', accent: '#6B7280' },
];

export const getCategoryMeta = (value) =>
  CATEGORIES.find((c) => c.value === value) || CATEGORIES[CATEGORIES.length - 1];

export const AUTH_STORAGE_KEY = 'emtb_auth'; // holds { token, user } in localStorage

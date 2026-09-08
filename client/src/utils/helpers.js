export const formatDate = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateShort = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Converts a Date (or ISO string) into 'YYYY-MM-DD' for <input type="date">
export const toDateInputValue = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
};

// Combines the event's `date` (Date/ISO) and `time` ("HH:MM") fields into one real Date object
export const getEventDateTime = (event) => {
  if (!event?.date) return null;
  const datePart = new Date(event.date);
  if (Number.isNaN(datePart.getTime())) return null;

  if (event.time && /^\d{1,2}:\d{2}$/.test(event.time)) {
    const [hours, minutes] = event.time.split(':').map(Number);
    datePart.setHours(hours, minutes, 0, 0);
  }

  return datePart;
};

// True once the event's date + time is in the past
export const isEventExpired = (event) => {
  const eventDateTime = getEventDateTime(event);
  if (!eventDateTime) return false;
  return eventDateTime.getTime() < Date.now();
};

// Pulls a friendly message out of an axios error, falling back gracefully
export const getErrorMessage = (error) => {
  if (error?.response?.data?.errors?.length) {
    return error.response.data.errors.map((e) => e.message).join(', ');
  }
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
};

export const truncate = (text, maxLength = 140) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text;
};

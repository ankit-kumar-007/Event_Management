import { useCallback, useEffect, useState } from 'react';
import { fetchEvents } from '../services/eventService';
import { getErrorMessage } from '../utils/helpers';

/**
 * Fetches the (now login-required) event list.
 * Re-fetches whenever category, search, or page change.
 * Pass enabled: false to skip fetching entirely (e.g. while logged out).
 */
export const useEvents = ({ category = '', search = '', page = 1, limit = 9, enabled = true } = {}) => {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchEvents({ category, search, page, limit });
      setEvents(data.events);
      setPagination(data.pagination);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [category, search, page, limit, enabled]);

  useEffect(() => {
    load();
  }, [load]);

  return { events, pagination, isLoading, error, refetch: load };
};

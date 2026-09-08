import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMyEvents } from '../../services/eventService';
import { useAuth } from '../../hooks/useAuth';
import { getErrorMessage, formatDateShort, isEventExpired } from '../../utils/helpers';
import Loader from '../../components/common/Loader';

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyEvents()
      .then(setEvents)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, []);

  const upcoming = events.filter((e) => !isEventExpired(e));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="mt-2 text-sm text-ink/60">Here's how your events are looking.</p>
        </div>
        <Link
          to="/organizer/events/new"
          className="bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
        >
          New event
        </Link>
      </div>

      {isLoading ? (
        <Loader label="Loading your events…" />
      ) : error ? (
        <p className="mt-10 text-sm text-red-600">{error}</p>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border border-ink/10 p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-ink/45">Total events</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">{events.length}</p>
            </div>
            <div className="border border-ink/10 p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-ink/45">Upcoming</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">{upcoming.length}</p>
            </div>
            <div className="border border-ink/10 p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-ink/45">Past</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">{events.length - upcoming.length}</p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-ink">Your events</h2>
            <Link to="/organizer/events" className="text-sm font-semibold text-navy hover:text-navy-light">
              Manage all
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="mt-4 border border-dashed border-ink/20 py-14 text-center">
              <p className="font-display text-lg text-ink">You haven't created an event yet.</p>
              <Link
                to="/organizer/events/new"
                className="mt-3 inline-block text-sm font-semibold text-navy hover:text-navy-light"
              >
                Create your first event
              </Link>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-ink/10 border border-ink/10">
              {events.slice(0, 5).map((event) => (
                <li key={event._id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <Link
                      to={`/organizer/events/${event._id}`}
                      className="font-medium text-ink hover:text-navy"
                    >
                      {event.title}
                    </Link>
                    <p className={`font-mono text-xs ${isEventExpired(event) ? 'text-red-600' : 'text-ink/50'}`}>
                      {formatDateShort(event.date)} · {event.venue}
                      {isEventExpired(event) ? ' · Event Expired' : ''}
                    </p>
                  </div>
                  <Link
                    to={`/organizer/events/${event._id}/edit`}
                    className="text-sm font-medium text-navy hover:text-navy-light"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;

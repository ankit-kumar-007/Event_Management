import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchEventById } from '../../services/eventService';
import { getErrorMessage } from '../../utils/helpers';
import EventDetails from '../../components/events/EventDetails';
import Loader from '../../components/common/Loader';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchEventById(id)
      .then((data) => {
        if (isMounted) setEvent(data);
      })
      .catch((err) => {
        if (isMounted) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) return <Loader label="Loading event…" />;

  if (error || !event) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="font-display text-xl text-ink">{error || 'Event not found.'}</p>
        <Link to="/events" className="mt-4 inline-block text-sm font-semibold text-navy hover:text-navy-light">
          Back to all events
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <EventDetails event={event} />
    </div>
  );
};

export default EventDetailsPage;

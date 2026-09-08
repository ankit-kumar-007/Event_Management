import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventForm from '../../components/organizer/EventForm';
import { fetchEventById, updateEventRequest } from '../../services/eventService';
import { getErrorMessage } from '../../utils/helpers';
import Loader from '../../components/common/Loader';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEventById(id)
      .then(setEvent)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleSubmit = async (values) => {
    await updateEventRequest(id, values);
    navigate(`/organizer/events/${id}`);
  };

  if (isLoading) return <Loader label="Loading event…" />;
  if (error || !event) {
    return <p className="mx-auto max-w-2xl px-6 py-20 text-center text-sm text-red-600">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Edit event</h1>
      <p className="mt-2 text-sm text-ink/60">Update the details below — changes go live immediately.</p>
      <div className="mt-8">
        <EventForm initialValues={event} onSubmit={handleSubmit} submitLabel="Save changes" />
      </div>
    </div>
  );
};

export default EditEvent;

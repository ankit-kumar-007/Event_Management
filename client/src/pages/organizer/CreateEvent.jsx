import { useNavigate } from 'react-router-dom';
import EventForm from '../../components/organizer/EventForm';
import { createEventRequest } from '../../services/eventService';

const CreateEvent = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const event = await createEventRequest(values);
    navigate(`/organizer/events/${event._id}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Create an event</h1>
      <p className="mt-2 text-sm text-ink/60">
        Fill in the details attendees need, and link to a Google Form for registration or ticketing.
      </p>
      <div className="mt-8">
        <EventForm onSubmit={handleSubmit} submitLabel="Publish event" />
      </div>
    </div>
  );
};

export default CreateEvent;

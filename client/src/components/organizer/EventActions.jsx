import { Link } from 'react-router-dom';

const EventActions = ({ eventId, onDelete }) => {
  return (
    <div className="flex items-center justify-end gap-4 text-sm">
      <Link to={`/organizer/events/${eventId}`} className="font-medium text-ink/60 hover:text-ink">
        View
      </Link>
      <Link to={`/organizer/events/${eventId}/edit`} className="font-medium text-navy hover:text-navy-light">
        Edit
      </Link>
      <button type="button" onClick={() => onDelete(eventId)} className="font-medium text-red-600 hover:text-red-700">
        Delete
      </button>
    </div>
  );
};

export default EventActions;

import EventCard from './EventCard';
import Loader from '../common/Loader';

const EventList = ({ events, isLoading, error, pagination, onPageChange }) => {
  if (isLoading) return <Loader label="Finding events…" />;

  if (error) {
    return <p className="py-16 text-center text-sm text-red-600">{error}</p>;
  }

  if (!events.length) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-xl text-ink">No events match yet.</p>
        <p className="mt-1 text-sm text-ink/55">Try a different category, or clear your search.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={pagination.page <= 1}
            onClick={() => onPageChange(pagination.page - 1)}
            className="border border-ink/15 px-4 py-2 text-sm font-medium text-ink disabled:opacity-30"
          >
            Previous
          </button>
          <span className="font-mono text-xs text-ink/55">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            type="button"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => onPageChange(pagination.page + 1)}
            className="border border-ink/15 px-4 py-2 text-sm font-medium text-ink disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EventList;

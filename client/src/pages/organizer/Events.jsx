import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMyEvents, deleteEventRequest } from '../../services/eventService';
import { getErrorMessage } from '../../utils/helpers';
import EventTable from '../../components/organizer/EventTable';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';

const OrganizerEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const load = () => {
    setIsLoading(true);
    fetchMyEvents()
      .then(setEvents)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEventRequest(pendingDeleteId);
      setEvents((prev) => prev.filter((e) => e._id !== pendingDeleteId));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Your events</h1>
          <p className="mt-2 text-sm text-ink/60">Edit details or take an event down.</p>
        </div>
        <Link
          to="/organizer/events/new"
          className="bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
        >
          New event
        </Link>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <Loader label="Loading your events…" />
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <EventTable events={events} onDelete={setPendingDeleteId} />
        )}
      </div>

      <Modal
        isOpen={Boolean(pendingDeleteId)}
        title="Delete this event?"
        confirmLabel={isDeleting ? 'Deleting…' : 'Delete event'}
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      >
        This can't be undone. Anyone with the registration link will no longer see it listed on Eventé.
      </Modal>
    </div>
  );
};

export default OrganizerEvents;

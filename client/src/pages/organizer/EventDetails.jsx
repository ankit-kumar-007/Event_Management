import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchEventById, deleteEventRequest } from '../../services/eventService';
import { getErrorMessage } from '../../utils/helpers';
import EventDetails from '../../components/events/EventDetails';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';

const OrganizerEventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchEventById(id)
      .then(setEvent)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEventRequest(id);
      navigate('/organizer/events');
    } catch (err) {
      setError(getErrorMessage(err));
      setIsDeleting(false);
    }
  };

  if (isLoading) return <Loader label="Loading event…" />;

  if (error || !event) {
    return <p className="mx-auto max-w-2xl px-6 py-20 text-center text-sm text-red-600">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <EventDetails
        event={event}
        actions={
          <div className="mt-6 flex gap-4">
            <Link
              to={`/organizer/events/${id}/edit`}
              className="border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Edit event
            </Link>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:border-red-400"
            >
              Delete
            </button>
          </div>
        }
      />

      <Modal
        isOpen={showDeleteModal}
        title="Delete this event?"
        confirmLabel={isDeleting ? 'Deleting…' : 'Delete event'}
        isDanger
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      >
        This can't be undone.
      </Modal>
    </div>
  );
};

export default OrganizerEventDetails;

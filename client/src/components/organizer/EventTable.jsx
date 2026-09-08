import { formatDateShort, isEventExpired } from '../../utils/helpers';
import { getCategoryMeta } from '../../utils/constants';
import EventActions from './EventActions';

const EventTable = ({ events, onDelete }) => {
  if (!events.length) {
    return (
      <div className="border border-dashed border-ink/20 py-16 text-center">
        <p className="font-display text-lg text-ink">No events yet.</p>
        <p className="mt-1 text-sm text-ink/55">Create your first event to see it listed here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-ink/10">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 bg-ink/[0.02] text-xs font-medium uppercase tracking-wide text-ink/45">
            <th className="px-4 py-3">Event</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Venue</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            const category = getCategoryMeta(event.category);
            const expired = isEventExpired(event);
            return (
              <tr key={event._id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{event.title}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-0.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: category.accent }}
                  >
                    {category.label}
                  </span>
                </td>
                <td className={`px-4 py-3 font-mono text-xs ${expired ? 'text-red-600' : 'text-ink/60'}`}>
                  {formatDateShort(event.date)} · {event.time}
                </td>
                <td className="px-4 py-3 text-ink/70">{event.venue}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold ${
                      expired ? 'bg-ink/10 text-ink/50' : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {expired ? 'Event Expired' : 'Upcoming'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <EventActions eventId={event._id} onDelete={onDelete} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;

import { Link } from 'react-router-dom';
import { formatDateShort, truncate, isEventExpired } from '../../utils/helpers';
import { getCategoryMeta } from '../../utils/constants';

const EventCard = ({ event }) => {
  const category = getCategoryMeta(event.category);
  const expired = isEventExpired(event);

  return (
    <Link
      to={`/events/${event._id}`}
      className={`group block ticket-card ${expired ? 'opacity-70 grayscale' : ''}`}
      aria-label={`View details for ${event.title}${expired ? ' (event expired)' : ''}`}
    >
      <div className="relative h-40 w-full overflow-hidden bg-navy">
        {event.image ? (
          <img
            src={event.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-3xl text-white/25">{event.title.charAt(0)}</span>
          </div>
        )}

        {expired ? (
          <span className="absolute left-3 top-3 bg-ink/80 px-2.5 py-1 text-xs font-semibold text-white">
            Event Expired
          </span>
        ) : (
          <span
            className="absolute left-3 top-3 px-2.5 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: category.accent }}
          >
            {category.label}
          </span>
        )}
      </div>

      <div className="ticket-perforation" />

      <div className="p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">{event.title}</h3>
        <p className="mt-1 text-sm text-ink/60">{truncate(event.description, 90)}</p>

        <div className="mt-3 flex items-center justify-between font-mono text-xs text-ink/55">
          <span className={expired ? 'text-red-600' : ''}>
            {formatDateShort(event.date)} · {event.time}
          </span>
          <span className="truncate pl-2">{event.venue}</span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

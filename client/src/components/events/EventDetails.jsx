import { formatDate, isEventExpired } from '../../utils/helpers';
import { getCategoryMeta } from '../../utils/constants';

const EventDetails = ({ event, actions = null }) => {
  const category = getCategoryMeta(event.category);
  const expired = isEventExpired(event);

  return (
    <article className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <div className="h-64 w-full overflow-hidden bg-navy sm:h-80">
          {event.image ? (
            <img src={event.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-5xl text-white/20">{event.title.charAt(0)}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className="mt-5 inline-block px-2.5 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: category.accent }}
          >
            {category.label}
          </span>
          {expired && (
            <span className="mt-5 inline-block bg-ink/80 px-2.5 py-1 text-xs font-semibold text-white">
              Event Expired
            </span>
          )}
        </div>

        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{event.title}</h1>

        {event.organizer?.name && (
          <p className="mt-2 text-sm text-ink/55">Hosted by {event.organizer.name}</p>
        )}

        <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-ink/75">
          {event.description}
        </p>

        {actions}
      </div>

      {/* Tear-off ticket panel */}
      <aside className="ticket-card h-fit self-start">
        <div className="p-5">
          <p className="font-display text-lg font-semibold text-ink">Event details</p>

          <dl className="mt-4 space-y-3 font-mono text-sm text-ink/70">
            <div className="flex justify-between gap-3">
              <dt className="text-ink/45">Date</dt>
              <dd className={`text-right ${expired ? 'text-red-600' : ''}`}>{formatDate(event.date)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink/45">Time</dt>
              <dd className="text-right">{event.time}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink/45">Venue</dt>
              <dd className="text-right">{event.venue}</dd>
            </div>
            {event.ticketInfo && (
              <div className="flex justify-between gap-3">
                <dt className="text-ink/45">Tickets</dt>
                <dd className="text-right">{event.ticketInfo}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="ticket-perforation" />

        <div className="p-5">
          {expired ? (
            <>
              <div className="block w-full bg-ink/10 py-3 text-center text-sm font-semibold text-ink/50">
                Event Expired
              </div>
              <p className="mt-2 text-center text-xs text-ink/45">
                This event's date and time have already passed.
              </p>
            </>
          ) : (
            <>
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-amber py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-amber-dark"
              >
                Register / book a ticket
              </a>
              <p className="mt-2 text-center text-xs text-ink/45">Opens the organizer's registration form</p>
            </>
          )}
        </div>
      </aside>
    </article>
  );
};

export default EventDetails;

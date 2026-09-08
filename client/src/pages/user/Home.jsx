import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEvents } from '../../hooks/useEvents';
import EventList from '../../components/events/EventList';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { events, isLoading, error, pagination } = useEvents({ page: 1, limit: 3, enabled: isAuthenticated });

  return (
    <div>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-white/50">Tech · Cultural · Sports · Music</p>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Every kind of event, one place to find it
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-white/70">
            Browse what's happening near you, or set up your own event and hand off registrations to a simple
            form.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/events"
                className="bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-amber-dark"
              >
                Browse events
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-amber-dark"
              >
                Log in to browse events
              </Link>
            )}
            <Link
              to="/register/role"
              className="border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60"
            >
              Host an event
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {isAuthenticated ? (
          <>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold text-ink">Coming up</h2>
              <Link to="/events" className="text-sm font-semibold text-navy hover:text-navy-light">
                View all
              </Link>
            </div>
            <div className="mt-8">
              <EventList
                events={events}
                isLoading={isLoading}
                error={error}
                pagination={pagination}
                onPageChange={() => {}}
              />
            </div>
          </>
        ) : (
          <div className="border border-dashed border-ink/20 py-16 text-center">
            <p className="font-display text-xl text-ink">Log in to see what's happening</p>
            <p className="mt-2 text-sm text-ink/55">Events are only visible to signed-in accounts.</p>
            <div className="mt-5 flex justify-center gap-4">
              <Link to="/login" className="text-sm font-semibold text-navy hover:text-navy-light">
                Log in
              </Link>
              <Link to="/register/role" className="text-sm font-semibold text-navy hover:text-navy-light">
                Create an account
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

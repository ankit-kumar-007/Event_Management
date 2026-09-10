import { Link } from 'react-router-dom';

const roleOptions = [
  {
    role: 'user',
    title: 'Find events',
    description: 'Browse events by category, search, and register through the organizer\u2019s form.',
  },
  {
    role: 'organizer',
    title: 'Host events',
    description: 'Create and manage your own events, and share a registration link for tickets.',
  },
];

const RoleSelection = () => {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">How will you use Evento?</h1>
      <p className="mt-2 text-sm text-ink/60">You can only pick one for this account — choose what fits best.</p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {roleOptions.map((option) => (
          <Link
            key={option.role}
            to={`/register?role=${option.role}`}
            className="group border border-ink/12 p-6 transition-colors hover:border-navy"
          >
            <h2 className="font-display text-xl font-semibold text-ink">{option.title}</h2>
            <p className="mt-2 text-sm text-ink/60">{option.description}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-navy group-hover:text-navy-light">
              Continue
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink/55">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-navy hover:text-navy-light">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RoleSelection;

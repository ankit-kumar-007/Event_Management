import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-ink' : 'text-ink/55 hover:text-ink'}`;

const Navbar = () => {
  const { isAuthenticated, isOrganizer, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b border-ink/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-ink">
          Event<span className="text-amber-dark">é</span>
        </Link>

        <nav className="flex items-center gap-6">
          {isAuthenticated && (
            <NavLink to="/events" className={navLinkClass}>
              Browse events
            </NavLink>
          )}

          {isOrganizer && (
            <NavLink to="/organizer/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}

          {!isAuthenticated && (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Log in
              </NavLink>
              <Link
                to="/register"
                className="border border-navy bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
              >
                Sign up
              </Link>
            </>
          )}

          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-ink/60 sm:inline">Hi, {user.name.split(' ')[0]}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
              >
                Log out
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getErrorMessage } from '../../utils/helpers';
import { ROLES } from '../../utils/constants';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const user = await login(form);
      const redirectTo =
        location.state?.from?.pathname || (user.role === ROLES.ORGANIZER ? '/organizer/dashboard' : '/events');
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Welcome back</h1>
      <p className="mt-2 text-sm text-ink/60">Log in to book tickets or manage your events.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {error && <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange('email')}
            className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange('password')}
            className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-navy py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="mt-6 text-sm text-ink/55">
        New to Eventé?{' '}
        <Link to="/register/role" className="font-semibold text-navy hover:text-navy-light">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;

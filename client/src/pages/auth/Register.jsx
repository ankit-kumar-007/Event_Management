import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getErrorMessage } from '../../utils/helpers';
import { ROLES } from '../../utils/constants';

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === ROLES.ORGANIZER ? ROLES.ORGANIZER : ROLES.USER;

  const [form, setForm] = useState({ name: '', email: '', password: '', role: initialRole });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const user = await register(form);
      navigate(user.role === ROLES.ORGANIZER ? '/organizer/dashboard' : '/events');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Create your account</h1>
      <p className="mt-2 text-sm text-ink/60">
        Signing up as{' '}
        <span className="font-semibold text-ink">
          {form.role === ROLES.ORGANIZER ? 'an organizer' : 'an attendee'}
        </span>
        .{' '}
        <Link to="/register/role" className="font-medium text-navy hover:text-navy-light">
          Change
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {error && <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            Full name
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange('name')}
            className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
          />
        </div>

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
            minLength={6}
            value={form.password}
            onChange={handleChange('password')}
            className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
          />
          <p className="mt-1.5 text-xs text-ink/45">At least 6 characters.</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-navy py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:opacity-50"
        >
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-sm text-ink/55">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-navy hover:text-navy-light">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;

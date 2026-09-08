import { useState } from 'react';
import { CATEGORIES } from '../../utils/constants';
import { toDateInputValue, getErrorMessage } from '../../utils/helpers';

const emptyEvent = {
  title: '',
  description: '',
  category: 'tech',
  date: '',
  time: '',
  venue: '',
  image: '',
  ticketInfo: '',
  registrationLink: '',
};

const EventForm = ({ initialValues, onSubmit, submitLabel = 'Publish event' }) => {
  const [values, setValues] = useState({
    ...emptyEvent,
    ...initialValues,
    date: toDateInputValue(initialValues?.date) || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-ink">
          Event title
        </label>
        <input
          id="title"
          type="text"
          required
          value={values.title}
          onChange={handleChange('title')}
          className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          required
          rows={5}
          value={values.description}
          onChange={handleChange('description')}
          className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-ink">
            Category
          </label>
          <select
            id="category"
            value={values.category}
            onChange={handleChange('category')}
            className="mt-1.5 w-full border border-ink/15 bg-white px-3.5 py-2.5 text-sm focus:border-navy"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="venue" className="block text-sm font-medium text-ink">
            Venue
          </label>
          <input
            id="venue"
            type="text"
            required
            value={values.venue}
            onChange={handleChange('venue')}
            className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-ink">
            Date
          </label>
          <input
            id="date"
            type="date"
            required
            value={values.date}
            onChange={handleChange('date')}
            className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-ink">
            Time
          </label>
          <input
            id="time"
            type="time"
            required
            value={values.time}
            onChange={handleChange('time')}
            className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
          />
        </div>
      </div>

      <div>
        <label htmlFor="registrationLink" className="block text-sm font-medium text-ink">
          Registration link (Google Form)
        </label>
        <input
          id="registrationLink"
          type="url"
          required
          placeholder="https://forms.google.com/…"
          value={values.registrationLink}
          onChange={handleChange('registrationLink')}
          className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
        />
        <p className="mt-1.5 text-xs text-ink/50">
          Attendees are sent here to register or buy tickets. You'll collect their details in the form's
          responses.
        </p>
      </div>

      <div>
        <label htmlFor="ticketInfo" className="block text-sm font-medium text-ink">
          Ticket info <span className="font-normal text-ink/45">(optional)</span>
        </label>
        <input
          id="ticketInfo"
          type="text"
          placeholder="e.g. Free entry, or ₹200 at the gate"
          value={values.ticketInfo}
          onChange={handleChange('ticketInfo')}
          className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-ink">
          Cover image URL <span className="font-normal text-ink/45">(optional)</span>
        </label>
        <input
          id="image"
          type="url"
          placeholder="https://…"
          value={values.image}
          onChange={handleChange('image')}
          className="mt-1.5 w-full border border-ink/15 px-3.5 py-2.5 text-sm focus:border-navy"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:opacity-50"
      >
        {isSubmitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
};

export default EventForm;

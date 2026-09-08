import { CATEGORIES } from '../../utils/constants';

const EventFilters = ({ activeCategory, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter events by category">
      <button
        type="button"
        onClick={() => onChange('')}
        className={`border px-3.5 py-1.5 text-sm font-medium transition-colors ${
          activeCategory === ''
            ? 'border-ink bg-ink text-white'
            : 'border-ink/15 text-ink/65 hover:border-ink/30'
        }`}
      >
        All
      </button>
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.value;
        return (
          <button
            key={cat.value}
            type="button"
            onClick={() => onChange(cat.value)}
            className="border px-3.5 py-1.5 text-sm font-medium transition-colors"
            style={
              isActive
                ? { backgroundColor: cat.accent, borderColor: cat.accent, color: '#fff' }
                : { borderColor: '#e4e6ec', color: '#4b4f5a' }
            }
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

export default EventFilters;

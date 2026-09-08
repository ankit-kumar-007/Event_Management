import { useState } from 'react';

const SearchBar = ({ defaultValue = '', onSearch, placeholder = 'Search events by name or venue…' }) => {
  const [value, setValue] = useState(defaultValue);

  const submit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={submit} className="flex w-full max-w-xl items-stretch" role="search">
      <label htmlFor="event-search" className="sr-only">
        Search events
      </label>
      <input
        id="event-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-navy"
      />
      <button
        type="submit"
        className="shrink-0 border border-navy bg-navy px-5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

import { useState } from 'react';
import { useEvents } from '../../hooks/useEvents';
import EventList from '../../components/events/EventList';
import EventFilters from '../../components/events/EventFilters';
import SearchBar from '../../components/common/SearchBar';

const Events = () => {
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { events, isLoading, error, pagination } = useEvents({ category, search, page });

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Browse events</h1>
      <p className="mt-2 text-sm text-ink/60">Filter by category or search for something specific.</p>

      <div className="mt-8 flex flex-col gap-5">
        <SearchBar defaultValue={search} onSearch={handleSearch} />
        <EventFilters activeCategory={category} onChange={handleCategoryChange} />
      </div>

      <div className="mt-10">
        <EventList
          events={events}
          isLoading={isLoading}
          error={error}
          pagination={pagination}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Events;

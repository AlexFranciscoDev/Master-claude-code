import './FilterBar.css';

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 40 }, (_, index) => currentYear - index);
const RATINGS = [9, 8, 7, 6, 5];

function toggleSortOrder(sortBy) {
  if (!sortBy) return sortBy;
  return sortBy.endsWith('.desc') ? sortBy.replace('.desc', '.asc') : sortBy.replace('.asc', '.desc');
}

export function FilterBar({ genres, filters, onChange }) {
  const handleFieldChange = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value });
  };

  const handleToggleSortOrder = () => {
    const newSortBy = toggleSortOrder(filters.sortBy);
    onChange({ ...filters, sortBy: newSortBy });
  };

  const getSortLabel = () => {
    const order = filters.sortBy?.endsWith('.asc') ? '↑' : '↓';
    const base = filters.sortBy?.replace(/\.(asc|desc)$/, '');

    const labels = {
      'popularity': 'Popularity',
      'vote_average': 'Rating',
      'primary_release_date': 'Release Date',
    };

    return `${labels[base] || 'Popularity'} ${order}`;
  };

  return (
    <form className="filter-bar" onSubmit={(event) => event.preventDefault()}>
      <label className="filter-bar__field">
        <span className="filter-bar__label">Genre</span>
        <select value={filters.genreId} onChange={handleFieldChange('genreId')}>
          <option value="">All genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-bar__field">
        <span className="filter-bar__label">Year</span>
        <select value={filters.year} onChange={handleFieldChange('year')}>
          <option value="">Any year</option>
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-bar__field">
        <span className="filter-bar__label">Rating</span>
        <select value={filters.minRating} onChange={handleFieldChange('minRating')}>
          <option value="">Any rating</option>
          {RATINGS.map((rating) => (
            <option key={rating} value={rating}>
              {rating}+ / 10
            </option>
          ))}
        </select>
      </label>

      <label className="filter-bar__field">
        <span className="filter-bar__label">Sort by</span>
        <select value={filters.sortBy} onChange={handleFieldChange('sortBy')}>
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Rating</option>
          <option value="primary_release_date.desc">Release Date</option>
        </select>
      </label>

      <div className="filter-bar__sort-toggle">
        <button type="button" className="filter-bar__toggle-btn" onClick={handleToggleSortOrder} title="Toggle sort order">
          {getSortLabel()}
        </button>
      </div>
    </form>
  );
}

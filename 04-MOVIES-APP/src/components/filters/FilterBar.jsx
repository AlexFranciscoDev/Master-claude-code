import './FilterBar.css';

const YEARS = Array.from({ length: 40 }, (_, index) => new Date().getFullYear() - index);
const RATINGS = [9, 8, 7, 6, 5];

export function FilterBar({ genres, filters, onChange }) {
  const handleFieldChange = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value });
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
          <option value="primary_release_date.desc">Newest</option>
          <option value="primary_release_date.asc">Oldest</option>
        </select>
      </label>
    </form>
  );
}

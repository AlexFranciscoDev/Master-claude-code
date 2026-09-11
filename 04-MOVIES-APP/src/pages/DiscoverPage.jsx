import { useMemo } from 'react';
import { discoverMovies, getGenres, getNowPlaying, getTrending } from '../api/endpoints';
import { HeroSpotlight } from '../components/movie/HeroSpotlight';
import { MovieGrid } from '../components/movie/MovieGrid';
import { FilterBar } from '../components/filters/FilterBar';
import { ActiveFilterChips } from '../components/filters/ActiveFilterChips';
import { Pagination } from '../components/common/Pagination';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useFetch } from '../hooks/useFetch';
import { useQueryParams } from '../hooks/useQueryParams';

export function DiscoverPage() {
  const { getParam, setParam, setParams } = useQueryParams();

  const scope = getParam('scope');
  const page = Number(getParam('page', '1')) || 1;
  const filters = {
    genreId: getParam('genre'),
    year: getParam('year'),
    minRating: getParam('rating'),
    sortBy: getParam('sort', 'popularity.desc'),
  };

  const hasActiveFilters = Boolean(filters.genreId || filters.year || filters.minRating);

  const { data: genresData } = useFetch(() => getGenres(), []);
  const genres = genresData?.genres || [];

  const { data, isLoading, error, refetch } = useFetch(() => {
    if (hasActiveFilters) {
      return discoverMovies({ ...filters, page });
    }
    return scope === 'trending' ? getTrending(page) : getNowPlaying(page);
  }, [scope, page, filters.genreId, filters.year, filters.minRating, filters.sortBy, hasActiveFilters]);

  const genreMap = useMemo(() => {
    const map = {};
    for (const genre of genres) map[genre.id] = genre.name;
    return map;
  }, [genres]);

  const chips = useMemo(() => {
    const list = [];
    if (filters.genreId) {
      list.push({ key: 'genre', label: `Genre: ${genreMap[filters.genreId] || filters.genreId}` });
    }
    if (filters.year) list.push({ key: 'year', label: `Year: ${filters.year}` });
    if (filters.minRating) list.push({ key: 'rating', label: `Rating: ${filters.minRating}+` });
    return list;
  }, [filters, genreMap]);

  const handleFilterChange = (nextFilters) => {
    setParams({
      genre: nextFilters.genreId,
      year: nextFilters.year,
      rating: nextFilters.minRating,
      sort: nextFilters.sortBy,
      page: '1',
    });
  };

  const handleRemoveChip = (key) => {
    setParams({ [key]: undefined, page: '1' });
  };

  const handleClearAll = () => {
    setParams({ genre: undefined, year: undefined, rating: undefined, sort: undefined, page: '1' });
  };

  const movies = data?.results || [];
  const featuredMovie = !hasActiveFilters && page === 1 ? movies[0] : null;
  const gridMovies = featuredMovie ? movies.slice(1) : movies;

  return (
    <>
      {featuredMovie && <HeroSpotlight movie={featuredMovie} />}

      <main className="container">
        <section aria-labelledby="discover-heading">
          <h2 id="discover-heading" className="visually-hidden">
            {scope === 'trending' ? 'Trending movies' : 'Latest releases'}
          </h2>

          <FilterBar genres={genres} filters={filters} onChange={handleFilterChange} />
          <ActiveFilterChips chips={chips} onRemove={handleRemoveChip} onClearAll={handleClearAll} />

          {isLoading && <LoadingSpinner label="Loading movies…" />}
          {error && <ErrorMessage message={error.message} onRetry={refetch} />}
          {!isLoading && !error && <MovieGrid movies={gridMovies} />}

          {!isLoading && !error && data && (
            <Pagination
              currentPage={data.page}
              totalPages={Math.min(data.total_pages || 1, 500)}
              onPageChange={(nextPage) => setParam('page', String(nextPage))}
            />
          )}
        </section>
      </main>
    </>
  );
}

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

const ITEMS_PER_PAGE = 18;
const MAX_PAGES_TO_LOAD = 50;

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

  const currentYear = new Date().getFullYear();
  const hasActiveFilters = Boolean(filters.genreId || filters.year || filters.minRating);

  const { data: genresData } = useFetch(() => getGenres(), []);
  const genres = genresData?.genres || [];

  const { data: allResults, isLoading, error, refetch } = useFetch(() => {
    const fetchPages = async () => {
      let allMovies = [];
      let seenIds = new Set();
      let totalPages = 1;
      for (let i = 1; i <= MAX_PAGES_TO_LOAD; i++) {
        let pageData;
        if (hasActiveFilters) {
          pageData = await discoverMovies({ ...filters, year: filters.year || currentYear, page: i });
        } else {
          pageData = scope === 'trending' ? await getTrending(i) : await getNowPlaying(i);
        }
        for (const movie of pageData.results) {
          if (!seenIds.has(movie.id)) {
            seenIds.add(movie.id);
            allMovies.push(movie);
          }
        }
        totalPages = pageData.total_pages;
        if (i >= pageData.total_pages) break;
      }
      return { results: allMovies, totalPages };
    };
    return fetchPages();
  }, [scope, filters.genreId, filters.year, filters.minRating, filters.sortBy, hasActiveFilters, currentYear]);

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

  const paginatedResults = useMemo(() => {
    if (!allResults?.results) return { movies: [], totalPages: 1, featuredMovie: null };

    const allMovies = allResults.results;
    const featuredMovie = !hasActiveFilters && page === 1 ? allMovies[0] : null;

    let moviesToPaginate;
    let startIdx;

    if (page === 1 && featuredMovie) {
      moviesToPaginate = allMovies.slice(1);
      startIdx = 0;
    } else {
      moviesToPaginate = allMovies;
      startIdx = (page - 1) * ITEMS_PER_PAGE;
    }

    const paginatedMovies = moviesToPaginate.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(moviesToPaginate.length / ITEMS_PER_PAGE);

    return { movies: paginatedMovies, totalPages, featuredMovie };
  }, [allResults, page, hasActiveFilters]);

  return (
    <>
      {paginatedResults.featuredMovie && <HeroSpotlight movie={paginatedResults.featuredMovie} />}

      <main className="container">
        <section aria-labelledby="discover-heading">
          <h2 id="discover-heading" className="visually-hidden">
            {scope === 'trending' ? 'Trending movies' : 'Latest releases'}
          </h2>

          <FilterBar genres={genres} filters={filters} onChange={handleFilterChange} />
          <ActiveFilterChips chips={chips} onRemove={handleRemoveChip} onClearAll={handleClearAll} />

          {isLoading && <LoadingSpinner label="Loading movies…" />}
          {error && <ErrorMessage message={error.message} onRetry={refetch} />}
          {!isLoading && !error && <MovieGrid movies={paginatedResults.movies} />}

          {!isLoading && !error && paginatedResults.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={paginatedResults.totalPages}
              onPageChange={(nextPage) => setParam('page', String(nextPage))}
            />
          )}
        </section>
      </main>
    </>
  );
}

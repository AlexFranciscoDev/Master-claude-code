import { useMemo } from 'react';
import { getGenres, searchMovies } from '../api/endpoints';
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

export function SearchResultsPage() {
  const { getParam, setParam, setParams } = useQueryParams();
  const query = getParam('q');
  const page = Number(getParam('page', '1')) || 1;

  const filters = {
    genreId: getParam('genre'),
    year: getParam('year'),
    minRating: getParam('rating'),
    sortBy: getParam('sort', 'popularity.desc'),
  };

  const { data: genresData } = useFetch(() => getGenres(), []);
  const genres = genresData?.genres || [];

  const { data: allResults, isLoading, error, refetch } = useFetch(() => {
    if (!query) return Promise.resolve({ results: [], totalPages: 1 });

    const fetchPages = async () => {
      let allMovies = [];
      let seenIds = new Set();
      for (let i = 1; i <= MAX_PAGES_TO_LOAD; i++) {
        const data = await searchMovies(query, i);
        for (const movie of data.results) {
          if (!seenIds.has(movie.id)) {
            seenIds.add(movie.id);
            allMovies.push(movie);
          }
        }
        if (i >= data.total_pages) break;
      }
      return { results: allMovies, totalPages: 1 };
    };

    return fetchPages();
  }, [query]);

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

  const filteredAndPaginated = useMemo(() => {
    if (!allResults?.results) return { results: [], totalPages: 1 };

    let filtered = allResults.results;

    if (filters.genreId) {
      filtered = filtered.filter((movie) => movie.genre_ids?.includes(Number(filters.genreId)));
    }

    if (filters.year) {
      filtered = filtered.filter((movie) => {
        const movieYear = movie.release_date ? movie.release_date.slice(0, 4) : '';
        return movieYear === filters.year;
      });
    }

    if (filters.minRating) {
      filtered = filtered.filter((movie) => movie.vote_average >= Number(filters.minRating));
    }

    let sorted = [...filtered];
    const [sortField, sortOrder] = filters.sortBy.split('.');

    if (sortField === 'popularity') {
      sorted.sort((a, b) => (sortOrder === 'asc' ? a.popularity - b.popularity : b.popularity - a.popularity));
    } else if (sortField === 'vote_average') {
      sorted.sort((a, b) => (sortOrder === 'asc' ? a.vote_average - b.vote_average : b.vote_average - a.vote_average));
    } else if (sortField === 'primary_release_date') {
      sorted.sort((a, b) => {
        const dateA = a.release_date || '';
        const dateB = b.release_date || '';
        return sortOrder === 'asc' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
      });
    }

    const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
    const startIdx = (page - 1) * ITEMS_PER_PAGE;
    const paginatedResults = sorted.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    return { results: paginatedResults, totalPages };
  }, [allResults, filters.genreId, filters.year, filters.minRating, filters.sortBy, page]);

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

  return (
    <main className="container">
      <section aria-labelledby="search-heading">
        <h2 id="search-heading" className="page-heading">
          {query ? `Search results for "${query}"` : 'Search for a movie'}
        </h2>

        <FilterBar genres={genres} filters={filters} onChange={handleFilterChange} />
        <ActiveFilterChips chips={chips} onRemove={handleRemoveChip} onClearAll={handleClearAll} />

        {isLoading && <LoadingSpinner label="Searching…" />}
        {error && <ErrorMessage message={error.message} onRetry={refetch} />}
        {!isLoading && !error && (
          <MovieGrid
            movies={filteredAndPaginated.results}
            emptyMessage={query ? `No movies found for "${query}".` : 'Type a title in the search bar above.'}
          />
        )}

        {!isLoading && !error && filteredAndPaginated.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={filteredAndPaginated.totalPages}
            onPageChange={(nextPage) => setParam('page', String(nextPage))}
          />
        )}
      </section>
    </main>
  );
}

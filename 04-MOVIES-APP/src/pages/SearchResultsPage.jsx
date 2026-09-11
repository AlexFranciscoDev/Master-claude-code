import { searchMovies } from '../api/endpoints';
import { MovieGrid } from '../components/movie/MovieGrid';
import { Pagination } from '../components/common/Pagination';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useFetch } from '../hooks/useFetch';
import { useQueryParams } from '../hooks/useQueryParams';

export function SearchResultsPage() {
  const { getParam, setParam } = useQueryParams();
  const query = getParam('q');
  const page = Number(getParam('page', '1')) || 1;

  const { data, isLoading, error, refetch } = useFetch(() => {
    return query ? searchMovies(query, page) : Promise.resolve({ results: [], page: 1, total_pages: 1 });
  }, [query, page]);

  return (
    <main className="container">
      <section aria-labelledby="search-heading">
        <h2 id="search-heading" className="page-heading">
          {query ? `Search results for "${query}"` : 'Search for a movie'}
        </h2>

        {isLoading && <LoadingSpinner label="Searching…" />}
        {error && <ErrorMessage message={error.message} onRetry={refetch} />}
        {!isLoading && !error && (
          <MovieGrid
            movies={data?.results}
            emptyMessage={query ? `No movies found for "${query}".` : 'Type a title in the search bar above.'}
          />
        )}

        {!isLoading && !error && data && (
          <Pagination
            currentPage={data.page}
            totalPages={Math.min(data.total_pages || 1, 500)}
            onPageChange={(nextPage) => setParam('page', String(nextPage))}
          />
        )}
      </section>
    </main>
  );
}

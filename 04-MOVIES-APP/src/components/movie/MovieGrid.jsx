import { MovieCard } from './MovieCard';
import './MovieGrid.css';

export function MovieGrid({ movies, emptyMessage = 'No movies found.' }) {
  if (!movies || movies.length === 0) {
    return <p className="movie-grid__empty">{emptyMessage}</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

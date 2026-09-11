import { Link } from 'react-router-dom';
import { buildPosterUrl } from '../../api/imageUrls';
import { useLibrary } from '../../hooks/useLibrary';
import { formatYear } from '../../utils/formatters';
import { StatusBadge } from './StatusBadge';
import { RatingStars } from './RatingStars';
import './MovieCard.css';

export function MovieCard({ movie }) {
  const { isWatched, isInWatchlist, isFavorite } = useLibrary();
  const posterUrl = buildPosterUrl(movie.poster_path);

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card__link">
        <div className="movie-card__poster-wrap">
          {posterUrl ? (
            <img className="movie-card__poster" src={posterUrl} alt={`${movie.title} poster`} />
          ) : (
            <div className="movie-card__poster movie-card__poster--placeholder">No image</div>
          )}

          <div className="movie-card__badges">
            {isWatched(movie.id) && <StatusBadge status="watched" />}
            {isInWatchlist(movie.id) && <StatusBadge status="watchlist" />}
            {isFavorite(movie.id) && <StatusBadge status="favorite" />}
          </div>

          <div className="movie-card__rating">
            <RatingStars voteAverage={movie.vote_average} />
          </div>
        </div>

        <div className="movie-card__body">
          <h3 className="movie-card__title">{movie.title}</h3>
          <p className="movie-card__meta">{formatYear(movie.release_date)}</p>
          {movie.overview && <p className="movie-card__overview">{movie.overview}</p>}
        </div>
      </Link>
    </article>
  );
}

import { Link } from 'react-router-dom';
import { buildBackdropUrl } from '../../api/imageUrls';
import { useLibrary } from '../../hooks/useLibrary';
import { formatYear } from '../../utils/formatters';
import { RatingStars } from './RatingStars';
import './HeroSpotlight.css';

export function HeroSpotlight({ movie }) {
  const { toggleWatched, toggleWatchlist, toggleFavorite, isWatched, isInWatchlist, isFavorite } =
    useLibrary();

  if (!movie) return null;

  const backdropUrl = buildBackdropUrl(movie.backdrop_path);

  const handleWatchlistClick = (event) => {
    event.preventDefault();
    toggleWatchlist(movie);
  };

  const handleWatchedClick = (event) => {
    event.preventDefault();
    toggleWatched(movie);
  };

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    toggleFavorite(movie);
  };

  return (
    <section
      className="hero-spotlight"
      style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : undefined}
    >
      <div className="hero-spotlight__overlay">
        <div className="hero-spotlight__content container">
          <span className="hero-spotlight__eyebrow">Spotlight Premiere</span>
          <h1 className="hero-spotlight__title">{movie.title}</h1>
          <p className="hero-spotlight__meta">
            {formatYear(movie.release_date)} <RatingStars voteAverage={movie.vote_average} />
          </p>
          <p className="hero-spotlight__overview">{movie.overview}</p>

          <div className="hero-spotlight__actions">
            <Link to={`/movie/${movie.id}`} className="btn btn-primary">
              View Details
            </Link>
            <button
              type="button"
              className={`btn btn-secondary ${isInWatchlist(movie.id) ? 'is-active' : ''}`}
              onClick={handleWatchlistClick}
            >
              {isInWatchlist(movie.id) ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
            <button
              type="button"
              className={`btn btn-secondary ${isWatched(movie.id) ? 'is-active' : ''}`}
              onClick={handleWatchedClick}
            >
              {isWatched(movie.id) ? 'Watched' : 'Mark Watched'}
            </button>
            <button
              type="button"
              className={`btn-icon ${isFavorite(movie.id) ? 'is-active' : ''}`}
              aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
              onClick={handleFavoriteClick}
            >
              ♥
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

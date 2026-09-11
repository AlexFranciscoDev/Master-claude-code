import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../api/endpoints';
import { buildBackdropUrl, buildPosterUrl } from '../api/imageUrls';
import { useFetch } from '../hooks/useFetch';
import { useLibrary } from '../hooks/useLibrary';
import { formatCurrency, formatDate, formatRating, formatRuntime } from '../utils/formatters';
import { CastRow } from '../components/movie/CastRow';
import { MovieGrid } from '../components/movie/MovieGrid';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import './MovieDetailPage.css';

export function MovieDetailPage() {
  const { id } = useParams();
  const { data: movie, isLoading, error, refetch } = useFetch(() => getMovieDetail(id), [id]);
  const {
    toggleWatched,
    toggleWatchlist,
    toggleFavorite,
    setUserRating,
    isWatched,
    isInWatchlist,
    isFavorite,
    state,
  } = useLibrary();
  const [pendingRating, setPendingRating] = useState('');

  if (isLoading) return <LoadingSpinner label="Loading movie…" />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;
  if (!movie) return null;

  const trailer = (movie.videos?.results || []).find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube',
  );
  const cast = movie.credits?.cast || [];
  const director = (movie.credits?.crew || []).find((member) => member.job === 'Director');
  const recommendations = movie.recommendations?.results || [];
  const watchedEntry = state.watched[movie.id];

  const handleRatingSubmit = (event) => {
    event.preventDefault();
    const rating = Number(pendingRating);
    if (!Number.isFinite(rating) || rating < 0 || rating > 10) return;
    setUserRating(movie, rating);
    setPendingRating('');
  };

  return (
    <main className="container movie-detail">
      <nav className="movie-detail__breadcrumb" aria-label="Breadcrumb">
        Discover &gt; Movies &gt; {movie.title}
      </nav>

      <section className="movie-detail__hero">
        <div className="movie-detail__poster-wrap">
          {buildPosterUrl(movie.poster_path) ? (
            <img
              className="movie-detail__poster"
              src={buildPosterUrl(movie.poster_path)}
              alt={`${movie.title} poster`}
            />
          ) : (
            <div className="movie-detail__poster movie-detail__poster--placeholder">No image</div>
          )}
        </div>

        <div
          className="movie-detail__backdrop"
          style={
            buildBackdropUrl(movie.backdrop_path)
              ? { backgroundImage: `url(${buildBackdropUrl(movie.backdrop_path)})` }
              : undefined
          }
        >
          <div className="movie-detail__backdrop-overlay">
            <h1 className="movie-detail__title">
              {movie.title} <span className="movie-detail__year">({formatDate(movie.release_date).slice(-4)})</span>
            </h1>
            <p className="movie-detail__tags">
              {movie.runtime ? formatRuntime(movie.runtime) : null} · {formatDate(movie.release_date)}
              {director ? ` · Directed by ${director.name}` : ''}
            </p>

            <div className="movie-detail__score">
              <span className="movie-detail__score-value">{formatRating(movie.vote_average)}</span>
              <span className="movie-detail__score-label">/10 TMDB Score</span>
            </div>

            <div className="movie-detail__actions">
              <button
                type="button"
                className={`btn btn-secondary ${isWatched(movie.id) ? 'is-active' : ''}`}
                onClick={() => toggleWatched(movie)}
              >
                {isWatched(movie.id) ? 'Watched' : 'Mark Watched'}
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${isInWatchlist(movie.id) ? 'is-active' : ''}`}
                onClick={() => toggleWatchlist(movie)}
              >
                {isInWatchlist(movie.id) ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              <button
                type="button"
                className={`btn-icon ${isFavorite(movie.id) ? 'is-active' : ''}`}
                aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
                onClick={() => toggleFavorite(movie)}
              >
                ♥
              </button>
              {trailer && (
                <a
                  className="btn btn-primary"
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Play Trailer
                </a>
              )}
            </div>

            <form className="movie-detail__rating-form" onSubmit={handleRatingSubmit}>
              <label htmlFor="user-rating">Your Rating</label>
              <input
                id="user-rating"
                type="number"
                min="0"
                max="10"
                step="1"
                placeholder={watchedEntry?.userRating ?? '—'}
                value={pendingRating}
                onChange={(event) => setPendingRating(event.target.value)}
              />
              <button type="submit" className="btn btn-secondary">
                Save
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="movie-detail__columns">
        <div className="movie-detail__main">
          <section className="card movie-detail__panel" aria-labelledby="overview-heading">
            <h2 id="overview-heading">Overview</h2>
            <p className="movie-detail__overview">{movie.overview}</p>
            <ul className="movie-detail__genres">
              {(movie.genres || []).map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </section>

          {cast.length > 0 && (
            <section className="card movie-detail__panel" aria-labelledby="cast-heading">
              <h2 id="cast-heading">Top Billed Cast</h2>
              <CastRow cast={cast} />
            </section>
          )}
        </div>

        <aside className="movie-detail__sidebar">
          <section className="card movie-detail__panel" aria-labelledby="specs-heading">
            <h2 id="specs-heading">Film Specifications</h2>
            <dl className="movie-detail__specs">
              <div>
                <dt>Original Language</dt>
                <dd>{movie.original_language?.toUpperCase()}</dd>
              </div>
              <div>
                <dt>Release Status</dt>
                <dd>{movie.status}</dd>
              </div>
              <div>
                <dt>Production Budget</dt>
                <dd>{formatCurrency(movie.budget)}</dd>
              </div>
              <div>
                <dt>Worldwide Box Office</dt>
                <dd>{formatCurrency(movie.revenue)}</dd>
              </div>
              <div>
                <dt>External TMDB ID</dt>
                <dd>{movie.id}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>

      {recommendations.length > 0 && (
        <section aria-labelledby="recommendations-heading" className="movie-detail__recommendations">
          <h2 id="recommendations-heading">Recommended For You</h2>
          <MovieGrid movies={recommendations.slice(0, 6)} />
        </section>
      )}
    </main>
  );
}

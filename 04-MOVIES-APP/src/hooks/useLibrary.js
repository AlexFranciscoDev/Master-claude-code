import { useCallback, useContext, useMemo } from 'react';
import { LibraryContext } from '../context/LibraryContext';

function buildMovieMeta(movie) {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    year: movie.release_date ? movie.release_date.slice(0, 4) : '',
    voteAverage: movie.vote_average,
    genreIds: movie.genre_ids || [],
  };
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibrary must be used within a LibraryProvider');
  const { state, dispatch } = context;

  const toggleWatched = useCallback(
    (movie) => {
      dispatch({ type: 'TOGGLE_WATCHED', movieId: movie.id, movieMeta: buildMovieMeta(movie) });
    },
    [dispatch],
  );

  const toggleWatchlist = useCallback(
    (movie) => {
      dispatch({ type: 'TOGGLE_WATCHLIST', movieId: movie.id, movieMeta: buildMovieMeta(movie) });
    },
    [dispatch],
  );

  const toggleFavorite = useCallback(
    (movie) => {
      dispatch({ type: 'TOGGLE_FAVORITE', movieId: movie.id, movieMeta: buildMovieMeta(movie) });
    },
    [dispatch],
  );

  const setUserRating = useCallback(
    (movie, rating) => {
      dispatch({
        type: 'SET_USER_RATING',
        movieId: movie.id,
        rating,
        movieMeta: buildMovieMeta(movie),
      });
    },
    [dispatch],
  );

  const setNotes = useCallback(
    (movie, notes) => {
      dispatch({ type: 'SET_NOTES', movieId: movie.id, notes });
    },
    [dispatch],
  );

  const importState = useCallback(
    (payload) => {
      dispatch({ type: 'IMPORT_STATE', payload });
    },
    [dispatch],
  );

  const isWatched = useCallback((movieId) => Boolean(state.watched[movieId]), [state.watched]);
  const isInWatchlist = useCallback(
    (movieId) => Boolean(state.watchlist[movieId]),
    [state.watchlist],
  );
  const isFavorite = useCallback(
    (movieId) => Boolean(state.favorites[movieId]),
    [state.favorites],
  );

  const counts = useMemo(
    () => ({
      watched: Object.keys(state.watched).length,
      watchlist: Object.keys(state.watchlist).length,
      favorites: Object.keys(state.favorites).length,
    }),
    [state.watched, state.watchlist, state.favorites],
  );

  const stats = useMemo(() => {
    const ratedEntries = Object.values(state.watched).filter(
      (entry) => typeof entry.userRating === 'number',
    );
    const avgRating = ratedEntries.length
      ? ratedEntries.reduce((sum, entry) => sum + entry.userRating, 0) / ratedEntries.length
      : 0;

    const genreCounts = {};
    for (const movieId of Object.keys(state.watched)) {
      const meta = state.movieMeta[movieId];
      for (const genreId of meta?.genreIds || []) {
        genreCounts[genreId] = (genreCounts[genreId] || 0) + 1;
      }
    }
    const topGenreId = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a])[0];

    return {
      avgRating,
      topGenreId: topGenreId ? Number(topGenreId) : null,
      topGenreCount: topGenreId ? genreCounts[topGenreId] : 0,
    };
  }, [state.watched, state.movieMeta]);

  return {
    state,
    counts,
    stats,
    toggleWatched,
    toggleWatchlist,
    toggleFavorite,
    setUserRating,
    setNotes,
    importState,
    isWatched,
    isInWatchlist,
    isFavorite,
  };
}

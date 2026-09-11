import { tmdbFetch } from './tmdbClient';

export function getNowPlaying(page = 1) {
  return tmdbFetch('/movie/now_playing', { page });
}

export function getTrending(page = 1) {
  return tmdbFetch('/trending/movie/day', { page });
}

export function searchMovies(query, page = 1) {
  return tmdbFetch('/search/movie', { query, page });
}

export function discoverMovies({ genreId, year, minRating, sortBy, page = 1 } = {}) {
  return tmdbFetch('/discover/movie', {
    with_genres: genreId,
    primary_release_year: year,
    'vote_average.gte': minRating,
    sort_by: sortBy || 'popularity.desc',
    page,
  });
}

export function getGenres() {
  return tmdbFetch('/genre/movie/list');
}

export function getMovieDetail(id) {
  return tmdbFetch(`/movie/${id}`, {
    append_to_response: 'credits,videos,recommendations',
  });
}

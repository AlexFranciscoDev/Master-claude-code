const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;

export class TmdbError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'TmdbError';
    this.statusCode = statusCode;
  }
}

export async function tmdbFetch(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  }

  let response;
  try {
    response = await fetch(url.toString());
  } catch {
    throw new TmdbError('Network error: could not reach TMDB.', 0);
  }

  let body;
  try {
    body = await response.json();
  } catch {
    throw new TmdbError('Received an unreadable response from TMDB.', response.status);
  }

  if (!response.ok) {
    throw new TmdbError(body.status_message || 'TMDB request failed.', response.status);
  }

  return body;
}

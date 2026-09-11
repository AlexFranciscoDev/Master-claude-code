const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const POSTER_SIZES = {
  small: 'w200',
  medium: 'w342',
  large: 'w500',
  original: 'original',
};

export const BACKDROP_SIZES = {
  medium: 'w780',
  large: 'w1280',
  original: 'original',
};

export function buildPosterUrl(path, size = POSTER_SIZES.medium) {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function buildBackdropUrl(path, size = BACKDROP_SIZES.large) {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function buildProfileUrl(path, size = POSTER_SIZES.small) {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

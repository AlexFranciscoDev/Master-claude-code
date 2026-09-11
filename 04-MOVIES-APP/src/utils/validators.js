const REQUIRED_KEYS = ['watched', 'watchlist', 'favorites', 'movieMeta'];

export function isValidLibraryShape(payload) {
  if (!payload || typeof payload !== 'object') return false;
  return REQUIRED_KEYS.every(
    (key) => key in payload && typeof payload[key] === 'object' && payload[key] !== null,
  );
}

import { createContext, useEffect, useReducer } from 'react';

export const LibraryContext = createContext(null);

const STORAGE_KEY = 'cinevault:library';

const emptyState = {
  watched: {},
  watchlist: {},
  favorites: {},
  movieMeta: {},
};

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw);
    return { ...emptyState, ...parsed };
  } catch {
    return emptyState;
  }
}

function toggleEntry(collection, movieId, extra = {}) {
  const next = { ...collection };
  if (next[movieId]) {
    delete next[movieId];
  } else {
    next[movieId] = { addedAt: new Date().toISOString(), ...extra };
  }
  return next;
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_WATCHED':
      return {
        ...state,
        watched: toggleEntry(state.watched, action.movieId),
        movieMeta: { ...state.movieMeta, [action.movieId]: action.movieMeta },
      };
    case 'TOGGLE_WATCHLIST':
      return {
        ...state,
        watchlist: toggleEntry(state.watchlist, action.movieId),
        movieMeta: { ...state.movieMeta, [action.movieId]: action.movieMeta },
      };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: toggleEntry(state.favorites, action.movieId),
        movieMeta: { ...state.movieMeta, [action.movieId]: action.movieMeta },
      };
    case 'SET_USER_RATING':
      return {
        ...state,
        watched: {
          ...state.watched,
          [action.movieId]: {
            ...(state.watched[action.movieId] || { addedAt: new Date().toISOString() }),
            userRating: action.rating,
          },
        },
        movieMeta: { ...state.movieMeta, [action.movieId]: action.movieMeta },
      };
    case 'SET_NOTES':
      return {
        ...state,
        watched: {
          ...state.watched,
          [action.movieId]: {
            ...(state.watched[action.movieId] || { addedAt: new Date().toISOString() }),
            notes: action.notes,
          },
        },
      };
    case 'IMPORT_STATE':
      return { ...emptyState, ...action.payload };
    default:
      return state;
  }
}

export function LibraryProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <LibraryContext.Provider value={{ state, dispatch }}>{children}</LibraryContext.Provider>
  );
}

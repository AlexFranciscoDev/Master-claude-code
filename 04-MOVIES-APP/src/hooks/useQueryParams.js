import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = useCallback(
    (key, fallback = '') => searchParams.get(key) ?? fallback,
    [searchParams],
  );

  const setParam = useCallback(
    (key, value) => {
      const next = new URLSearchParams(searchParams);
      if (value === undefined || value === null || value === '') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      setSearchParams(next);
    },
    [searchParams, setSearchParams],
  );

  const setParams = useCallback(
    (updates) => {
      const next = new URLSearchParams(searchParams);
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === null || value === '') {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      }
      setSearchParams(next);
    },
    [searchParams, setSearchParams],
  );

  return { searchParams, getParam, setParam, setParams };
}

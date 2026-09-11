import { useEffect, useState } from 'react';

export function useFetch(fetcher, deps) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!isCancelled) setData(result);
      })
      .catch((err) => {
        if (!isCancelled) setError(err);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, retryToken]);

  const refetch = () => setRetryToken((token) => token + 1);

  return { data, isLoading, error, refetch };
}

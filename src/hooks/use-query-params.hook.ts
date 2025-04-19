import React from 'react';
import { useSearchParams } from 'react-router-dom';

type Params = Record<string, string | string[]>;

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params: Params = React.useMemo(
    () =>
      Array.from(searchParams).reduce(
        (prev, [key, value]) => ({ ...prev, [key]: value }),
        {},
      ),
    [searchParams],
  );

  const setParams = React.useCallback(
    (p?: Params) => {
      const nextParams = JSON.parse(
        JSON.stringify({ ...params, ...(p ?? {}) }),
      ) as Params;

      setSearchParams(nextParams);
    },
    [params, setSearchParams],
  );

  return { params, setParams };
}

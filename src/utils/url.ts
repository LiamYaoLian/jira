/**
 * What: util functions for optimistic update
 */
import {URLSearchParamsInit, useSearchParams} from 'react-router-dom';
import {useMemo, useState} from 'react';
import {cleanObject, subset} from './index';

/**
 * What: a function to get the parameter in the page url based on keys and a function to set search params
 * How:
 * Highlight: useMemo; clean params in url
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // an array of search params
  const [searchParams] = useSearchParams();
  // a function to clean params in url
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);

  return [
    useMemo(() => subset(Object.fromEntries(searchParams), stateKeys) as { [key in K]: string },
      [searchParams, stateKeys]),

    (params: Partial<{ [key in K]: unknown }>) => setSearchParams(params)
  ] as const;
};

/*
* What: a function to clean params in url by deleting void params
* */
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({...Object.fromEntries(searchParams), ...params,}) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};

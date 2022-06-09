/*
* some util functions
* */
import {useEffect, useRef, useState} from 'react';

/*
* a function to remove keys whose values are undefined, null, or ''
* */
export const cleanObject = (object?: { [key: string]: unknown }) => {

  if (!object) {
    return {};
  }

  // to make the function pure
  const result = {...object};
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';

/*
* a function to achieve "when a component is mounted, call the callback"
* */
export const useMount = (callback: () => void) => {
  useEffect(() => callback(), [callback]);
};

/*
* a function to set value after a delay
* Why: to avoid sending too many requests while user is typing
* Highlight: closure
* */
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // set a timer when value changes
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // clearTimeout in componentWillUnmount; clear the last timeout
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

/*
* a function to update the document title; recover the old title in componentWillUnmount if we don't want to keep the new title
* Highlight: useRef
* */
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

/*
* a function to reset route to origin
* */
export const resetRoute = () => (window.location.href = window.location.origin);

/*
* a function to return a subset of an object
* How: pass an object and an array of keys, return a new object whose keys exist in the array of keys
* */
export const subset = <O extends { [key in string]: unknown }, K extends keyof O>(obj: O, keys: K[])=> {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/*
* a function to indicate whether a component is mounted (true) or not (false)
* Highlight: useRef
* */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

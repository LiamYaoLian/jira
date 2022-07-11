import {useCallback, useReducer, useState} from 'react';
import {useMountedRef} from './index';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

/**
 * a function to return a function that will call dispatch if the component is mounted
 * @param dispatch
 */
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  //a function to indicate whether a component is mounted (true) or not (false)
  const mountedRef = useMountedRef()
  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}

/**
 * used to trigger an async request
 * @param initialState
 * @param initialConfig
 */
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, ...initialConfig};
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({...state, ...action}),
    {...defaultInitialState, ...initialState});
  const safeDispatch = useSafeDispatch(dispatch)
  /*
  * if we pass a function into useState(), the function will be used for lazy init
  * Therefore, if we want to store a function as a state, we cannot pass the function directly
  * */
  // retry is used to refresh the page after editing
  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback((data: D) =>
    safeDispatch({data, stat: 'success', error: null}), [safeDispatch]);

  const setError = useCallback((error: Error) =>
    safeDispatch({error, stat: 'error', data: null,}), [safeDispatch]);

  // used to trigger an async request
  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    // if it is not a Promise object
    if (!promise || !promise.then) throw new Error('Please pass a Promise object')

    setRetry(() => () => {
      if (runConfig?.retry) run(runConfig?.retry(), runConfig).then()
    })

    // use "prevState" to prevent circular dependency
    // waiting for a response, now the status is 'loading'
    safeDispatch({stat: 'loading'});
    return promise
      .then((data) => {
        // update data, status, error
        setData(data);
        return data;
      })
      .catch((error) => {
        // update data, status, error
        setError(error);
        // return a rejected Promise obj so that we can deal with it outside this function
        if (config.throwOnError) return Promise.reject(error)
        return error;
      });
  }, [config.throwOnError, setData, setError, safeDispatch])


  // return status and functions
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    retry,
    setData,
    setError,
    ...state,
  };
};

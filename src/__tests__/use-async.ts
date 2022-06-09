import { useAsync } from 'utils/use-async';
import { act, renderHook } from '@testing-library/react-hooks';

const defaultState: ReturnType<typeof useAsync> = {
  stat: 'idle',
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: 'loading',
  isIdle: false,
  isLoading: true,
};

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: 'success',
  isIdle: false,
  isSuccess: true,
};

test('useAsync is async', async () => {
  let resolve: any, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  // https://react-hooks-testing-library.com/reference/api#renderhook
  const { result } = renderHook(() => useAsync());
  // The current value of the result will reflect the latest of whatever is returned from the callback passed to renderHook.
  expect(result.current).toEqual(defaultState);

  let p: Promise<any>;
  // https://reactjs.org/docs/test-utils.html#act
  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(loadingState);
  const resolvedValue = { mockedValue: 'resolved' };
  await act(async () => {
    resolve(resolvedValue);
    await p;
  });
  expect(result.current).toEqual({
    ...successState,
    data: resolvedValue,
  });
});
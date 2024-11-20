import { defaults } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { makeCancelable } from '../libs/make-cancellable';

export interface AsyncActionOptions {
  clearDataOnReload: boolean;
  initiallyLoading: boolean;
}

interface AsyncAction<T> {
  data: T | undefined;
  loading: boolean;
  error: unknown;
}

const DEFAULT_OPTIONS: AsyncActionOptions = {
  initiallyLoading: false,
  clearDataOnReload: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAsyncAction<T, Args extends any[]>(
  action: (abortController: AbortController, ...args: Args) => Promise<T>,
  opts: Partial<AsyncActionOptions> = {}
) {
  const options = defaults(opts, DEFAULT_OPTIONS);

  const [state, setState] = useState<AsyncAction<T>>({
    data: undefined,
    error: undefined,
    loading: options.initiallyLoading,
  });

  const abortControllerRef = useRef<AbortController>();
  const actionRef = useRef(action);

  actionRef.current = action;

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const cancelActionRef = useRef<() => void>();
  const requestIdRef = useRef(0);

  const perform = useCallback(async (...args: Args) => {
    const handler = async () => {
      requestIdRef.current += 1;
      const currentRequestId = requestIdRef.current;

      try {
        setState((current) => ({
          loading: true,
          error: undefined,
          data: optionsRef.current.clearDataOnReload ? undefined : current.data,
        }));

        const abortCtrl = new AbortController();
        abortControllerRef.current = abortCtrl;
        const data = await actionRef.current(abortCtrl, ...args);

        if (currentRequestId === requestIdRef.current) {
          setState({ data, loading: false, error: undefined });
        }

        return data;
      } catch (error) {
        if (currentRequestId === requestIdRef.current) {
          setState({ data: undefined, loading: false, error });
        }

        throw error;
      }
    };

    const { promise, cancel } = makeCancelable(handler());

    cancelActionRef.current = cancel;

    return promise;
  }, []);

  const trigger = useCallback(
    (...args: Args) => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      perform(...args).catch(() => {});
    },
    [perform]
  );

  const cancel = useCallback(() => cancelActionRef.current?.(), []);

  useEffect(
    () => () => {
      abortControllerRef.current?.abort();
      cancel();
    },
    [cancel]
  );

  return {
    ...state,
    perform,
    trigger,
    cancel,
  };
}

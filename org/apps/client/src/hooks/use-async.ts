import { defaults } from 'lodash';
import { DependencyList, useEffect } from 'react';
import { AsyncActionOptions, useAsyncAction } from './use-async-action';

type CleanupFn = () => unknown;
type OnCleanupFn = (callback: CleanupFn) => void;

export function useAsync<T>(
  action: (
    abortController: AbortController,
    onCleanup: OnCleanupFn
  ) => Promise<T>,
  dependencies: DependencyList,
  options: Partial<AsyncActionOptions> = {}
) {
  const { data, loading, error, trigger, cancel } = useAsyncAction(
    action,
    defaults(options, { initiallyLoading: true })
  );

  useEffect(() => {
    const cleanupFunctions: CleanupFn[] = [];
    trigger((cleanup) => cleanupFunctions.unshift(cleanup));

    return () => cleanupFunctions.forEach((f) => f());
  }, [trigger, ...dependencies]);

  return { data, loading, error, reload: trigger, cancel };
}

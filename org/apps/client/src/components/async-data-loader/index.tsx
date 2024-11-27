import { Box, CircularProgress, SxProps, Theme } from '@mui/material';
import { DependencyList, MutableRefObject, ReactNode } from 'react';
import { useAsync } from '../../hooks/use-async';
import { AsyncActionOptions } from '../../hooks/use-async-action';
import { DataNotFoundError, ErrorContainer } from '../error-container';

interface LoadingProps {
  size?: number;
  sx?: SxProps<Theme>;
}

export interface AsyncDataLoaderAPI {
  reload: () => void;
}

interface Props<T> {
  dataLoader: (abortController: AbortController) => Promise<T>;
  loadOptions?: Partial<AsyncActionOptions>;
  dependencies?: DependencyList;
  noDataMessage?: string;
  errorRenderer?: (error: unknown) => ReactNode;
  children: (data: T) => ReactNode;
  loadingProps?: {
    size?: number;
    sx?: SxProps<Theme>;
  };
  api?: MutableRefObject<AsyncDataLoaderAPI | undefined>;
}

type LoadingType = 'BLANK_PAGE' | 'BLANK_PAGE_WITH_TOP_BAR';

export const LOADING_PROPS: Record<LoadingType, LoadingProps> = {
  BLANK_PAGE: {
    size: 120,
    sx: {
      pt: 16,
      textAlign: 'center',
    },
  },

  BLANK_PAGE_WITH_TOP_BAR: {
    size: 120,
    sx: {
      pt: 7,
      textAlign: 'center',
    },
  },
};

export const defaultErrorRender = (error: unknown) => (
  <ErrorContainer>{error}</ErrorContainer>
);

export function AsyncDataLoader<T>({
  dataLoader,
  loadOptions,
  dependencies = [],
  noDataMessage = 'Data not found',
  errorRenderer = defaultErrorRender,
  children,
  loadingProps,
  api,
}: Props<T>) {
  const { loading, data, error, reload } = useAsync(
    dataLoader,
    dependencies,
    loadOptions
  );

  if (api) {
    api.current = {
      reload: () => reload(() => {}),
    };
  }

  if (loading && !data) {
    return (
      <Box sx={loadingProps?.sx}>
        <CircularProgress size={loadingProps?.size} />
      </Box>
    );
  }

  if (error) {
    return errorRenderer(error);
  }

  if (!data) {
    return <DataNotFoundError message={noDataMessage} />;
  }

  return children(data);
}

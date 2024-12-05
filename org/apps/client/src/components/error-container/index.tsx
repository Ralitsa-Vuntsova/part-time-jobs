import { Alert } from '@mui/material';
import { isString } from 'lodash';

interface IResponse {
  response: string;
}

function hasResponse(val: unknown): val is IResponse {
  if (!val) return false;
  return typeof (val as IResponse).response === 'string';
}

function getErrorMessage(error: unknown): string {
  if (error instanceof DOMException) {
    return error.message;
  }

  if (isString(error)) {
    return error;
  }

  // An API HttpException:
  if (hasResponse(error)) {
    return error.response;
  }

  // While unknown errors should be avoided as much as possible they are still possible
  // Logging them will help capturing more specific errors
  console.log(error);

  return 'Something went wrong';
}

interface ErrorContainerProps {
  children: unknown;
}

export function ErrorContainer({ children: error }: ErrorContainerProps) {
  if (error === undefined) return null;

  return <Alert severity="error">{getErrorMessage(error)}</Alert>;
}

interface DataNotFoundErrorProps {
  message?: string;
}

export function DataNotFoundError({
  message = 'Data not found',
}: DataNotFoundErrorProps) {
  return <Alert severity="error">{message}</Alert>;
}

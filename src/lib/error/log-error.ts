import { ErrorService } from './error-utils';

/**
 * The function `logBoundaryError` logs an error if it meets certain conditions.
 * @param {Error} error - The `error` parameter is of type `Error` and represents the error that
 * occurred.
 * @param info - The `info` parameter is an object that contains information about the component stack
 * trace. It has a single property `componentStack`, which is a string representing the stack trace of
 * the component where the error occurred.
 */
export const logBoundaryError = (
  error: Error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info: { componentStack: string },
) => {
  const shouldLogError = ErrorService.shouldCaptureError(error);

  if (shouldLogError) {
    // log error ...
    /*    */
  }
};

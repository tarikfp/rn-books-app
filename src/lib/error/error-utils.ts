import axios from 'axios';

const parseError = (error: any) =>
  error.error || error.message || error.originalError || error;

const shouldCaptureError = (error: any): boolean => !isNetworkError(error);

const isNetworkError = (error: any) => {
  const networkErr = ['Network Error', 'Error: Network Error'];
  return networkErr.includes(parseError(error));
};

const isServerError = (error: any) => {
  if (axios.isAxiosError(error) && error.response?.status) {
    const statusCode = error.response.status;
    return statusCode >= 500 && statusCode < 600;
  }

  return false;
};

export const ErrorService = {
  isServerError,
  isNetworkError,
  shouldCaptureError,
  parseError,
};

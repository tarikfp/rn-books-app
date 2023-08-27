import axios from 'axios';
import { ErrorService } from '../error-utils';

jest.mock('axios');

describe('ErrorService', () => {
  describe('isServerError', () => {
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    it('returns true for a server error', () => {
      const error = {
        response: {
          status: 500,
        },
      };

      const result = ErrorService.isServerError(error);
      expect(result).toBe(true);
    });

    it('returns false for a non-server error', () => {
      const error = {
        response: {
          status: 400,
        },
      };

      const result = ErrorService.isServerError(error);
      expect(result).toBe(false);
    });

    it('returns false for an Axios error without a response', () => {
      const error = {};

      const result = ErrorService.isServerError(error);
      expect(result).toBe(false);
    });
  });

  describe('isNetworkError', () => {
    it('returns true for a network error', () => {
      const error = new Error('Network Error');

      const result = ErrorService.isNetworkError(error);
      expect(result).toBe(true);
    });

    it('returns true for a network error (alternate format)', () => {
      const error = new Error('Error: Network Error');

      const result = ErrorService.isNetworkError(error);
      expect(result).toBe(true);
    });

    it('returns false for a non-network error', () => {
      const error = new Error('Something went wrong');

      const result = ErrorService.isNetworkError(error);
      expect(result).toBe(false);
    });
  });

  describe('shouldCaptureError', () => {
    it('returns true for a non-network error', () => {
      const error = new Error('Something went wrong');

      const result = ErrorService.shouldCaptureError(error);
      expect(result).toBe(true);
    });

    it('returns false for a network error', () => {
      const error = new Error('Network Error');

      const result = ErrorService.shouldCaptureError(error);
      expect(result).toBe(false);
    });
  });

  describe('parseError', () => {
    it('returns the error message', () => {
      const error = new Error('Something went wrong');

      const result = ErrorService.parseError(error);
      expect(result).toBe('Something went wrong');
    });

    it('returns the originalError if present', () => {
      const originalError = new Error('Original error');
      const error = {
        originalError,
      };

      const result = ErrorService.parseError(error);
      expect(result).toBe(originalError);
    });

    it('returns the error object if no message is present', () => {
      const error = {};

      const result = ErrorService.parseError(error);
      expect(result).toBe(error);
    });
  });
});

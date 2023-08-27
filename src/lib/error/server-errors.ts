import { BaseError } from './base-error';

type ServerErrorNames = 'SERVER_ERROR';

export const ServerErrorFeedbackMessages: Record<ServerErrorNames, string> = {
  SERVER_ERROR: 'Server error',
};

export class ServerError extends BaseError<ServerErrorNames> {}

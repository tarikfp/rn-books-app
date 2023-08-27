import { BaseError } from './base-error';

type NetworkErrorNames = 'NETWORK_ERROR';

export const NetworkErrorFeedbackMessages: Record<NetworkErrorNames, string> = {
  NETWORK_ERROR: 'Please kindly check your network connection',
};

export class NetworkError extends BaseError<NetworkErrorNames> {}

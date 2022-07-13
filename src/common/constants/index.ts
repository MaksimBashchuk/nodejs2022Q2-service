import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const APP_ROUTES = {
  USER: 'user',
};

export const WRONG_PASS_RESPONSE = {
  statusCode: StatusCodes.FORBIDDEN,
  message: ['old password does not match with user password'],
  error: ReasonPhrases.FORBIDDEN,
};

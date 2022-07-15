import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const APP_ROUTES = {
  USER: 'user',
  TRACK: 'track',
  ARTIST: 'artist',
  ALBUM: 'album',
  FAVORITES: 'favs',
};

export const WRONG_PASS_RESPONSE = {
  statusCode: StatusCodes.FORBIDDEN,
  message: ['old password does not match with user password'],
  error: ReasonPhrases.FORBIDDEN,
};

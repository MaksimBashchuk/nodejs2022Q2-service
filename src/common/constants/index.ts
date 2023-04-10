import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const REPLACE_TOKEN = '@replaceToken';

export const ID_FIELDS = {
  ALBUM: 'albumId',
  ARTIST: 'artistId',
};

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

export const WRONG_LOGIN = {
  statusCode: StatusCodes.FORBIDDEN,
  message: `Cannot find user with login '${REPLACE_TOKEN}'`,
  error: ReasonPhrases.FORBIDDEN,
};

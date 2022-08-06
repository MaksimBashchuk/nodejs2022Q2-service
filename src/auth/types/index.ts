export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthPayload = {
  login: string;
  sub: string;
};

export type RefreshPayload = AuthPayload & { refToken: string };

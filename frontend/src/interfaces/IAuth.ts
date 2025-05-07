export interface ILoginAuth {
  email: string;
  password: string;
}

export interface IRefreshToken {
  refreshToken: string;
}

export interface IAccessToken {
  accessToken: string;
}

export interface ITokenData {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}
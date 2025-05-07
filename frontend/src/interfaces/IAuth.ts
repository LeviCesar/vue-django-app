export interface ILoginAuth {
  username: string;
  password: string;
}

export interface IRefreshToken {
  refresh: string;
}

export interface IAccessToken {
  access: string;
}

export interface ITokenData {
  access: string;
  refresh: string;
}
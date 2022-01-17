import 'next-auth';

type JWTError = 'RefreshAccessTokenError';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    error?: JWTError;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    error?: JWTError;
  }
}

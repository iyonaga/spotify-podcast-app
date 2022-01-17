import NextAuth, { Awaitable } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url = `https://accounts.spotify.com/api/token?${new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    })}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
        'Content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (e) {
    console.log(e);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: 'user-library-read user-library-modify',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      // Initial sign in
      if (account) {
        return {
          accessToken: account.access_token!,
          accessTokenExpires: account.expires_at! * 1000,
          refreshToken: account.refresh_token!,
        };
      }

      // Return previous token if access token hasn't expired yet
      if (Date.now() < token.accessTokenExpires) {
        // console.log(token.accessTokenExpires);
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});

import '../styles/globals.css';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Auth from '@/components/Auth';

export type NextApplicationPage<P = {}, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & {
  Component: NextApplicationPage;
}) {
  return (
    <SessionProvider session={session}>
      {Component.requireAuth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default MyApp;

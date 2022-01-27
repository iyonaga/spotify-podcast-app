import '../styles/globals.css';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import Auth from '@/components/Auth';
import Layout from '@/components/layout/Layout';

export type NextApplicationPage<P = {}, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

const queryClient = new QueryClient();

nProgress.configure({ showSpinner: false });

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & {
  Component: NextApplicationPage;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      nProgress.start();
    };

    const handleStop = () => {
      nProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {Component.requireAuth ? (
            <Auth>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;

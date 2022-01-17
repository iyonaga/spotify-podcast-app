import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const Auth: React.VFC<Props> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  // if (status === 'loading') {
  //   return <p>loading...</p>;
  // }

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return null;
};

export default Auth;

import { signIn } from 'next-auth/react';

const Signin = () => (
  <button
    onClick={() =>
      signIn('spotify', {
        callbackUrl: '/',
      })
    }
  >
    Sign in
  </button>
);

export default Signin;

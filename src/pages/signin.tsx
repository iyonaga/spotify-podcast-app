import { signIn } from 'next-auth/react';

const Signin = () => (
  <div className="flex justify-center items-center h-screen">
    <button
      className="w-[360px] h-[60px] text-[26px] font-bold text-black bg-white rounded-[30px]"
      onClick={() =>
        signIn('spotify', {
          callbackUrl: '/',
        })
      }
    >
      Sign in with Spotify
    </button>
  </div>
);

export default Signin;

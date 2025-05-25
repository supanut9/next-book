import { auth, signOut, signIn } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const session = await auth();

  console.log('CLIENT or SERVER'); // This will log on the server side during rendering

  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="hover:text-gray-700 transition-colors">
                  Create
                </span>
              </Link>

              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button
                  type="submit"
                  className="hover:text-gray-700 transition-colors"
                >
                  Logout
                </button>
              </form>

              <Link href={`/user/${session?.user.id}`}>
                {' '}
                {/* Assuming user.id is what you intend for the user profile URL */}
                <span className="font-semibold hover:text-gray-700 transition-colors">
                  {session?.user.name}
                </span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {' '}
              {/* Added a div to group login buttons */}
              <form
                action={async () => {
                  'use server';
                  await signIn('github');
                }}
              >
                <button
                  type="submit"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Login with GitHub
                </button>
              </form>
              <form
                action={async () => {
                  'use server';
                  await signIn('google'); // Add the provider name for Google
                }}
              >
                <button
                  type="submit"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Login with Google
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

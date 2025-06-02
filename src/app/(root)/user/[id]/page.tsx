import { auth } from '@/auth';
import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartup from '@/components/UserStartup';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) {
    return notFound();
  }

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center">{user.name}</h3>
          </div>
          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />
          <div className="flex flex-col mt-1">
            <p className="text-30-extrabold text-center">
              {user?.username ? `@${user.username}` : null}
            </p>
            <p className="text-30-extrabold text-center">
              {user?.email ? `${user.email}` : null}
            </p>
            <p className="text-center text-14-normal">{user?.bio}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <p className="text-30-bold">
            {session?.id === id ? 'Your' : 'All'} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartup id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;

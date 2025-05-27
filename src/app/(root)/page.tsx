import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _id: 1,
      _createdAt: '2024-05-25T14:00:00Z',
      views: 128,
      author: {
        _id: 101,
        name: 'Jane Doe',
      },
      title: 'Exploring the Future of AI in Education',
      description:
        'Discover how AI is transforming classrooms and redefining the learning experience for students and educators.',
      image:
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Technology',
    },
    {
      _id: 2,
      _createdAt: '2024-05-20T09:30:00Z',
      views: 76,
      author: {
        _id: 102,
        name: 'John Smith',
      },
      title: '5 Habits of Highly Effective Remote Teams',
      description:
        'Learn what makes remote teams thrive — from communication strategies to work-life balance tips.',
      image:
        'https://plus.unsplash.com/premium_photo-1726735591595-1b369d48d02f?q=80&w=2934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Business',
    },
    {
      _id: 3,
      _createdAt: '2024-05-18T12:45:00Z',
      views: 214,
      author: {
        _id: 103,
        name: 'Emily Zhang',
      },
      title: 'Mastering TypeScript for Scalable Web Apps',
      description:
        'A practical guide to using TypeScript effectively in large-scale frontend and backend projects.',
      image:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      category: 'Programming',
    },
  ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}

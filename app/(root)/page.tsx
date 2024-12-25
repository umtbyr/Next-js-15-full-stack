import StartupCard, { StartupCardType } from "@/components/ui/StartupCard";
import SearchForm from "../../components/ui/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  const session = await auth();

  return (
    <>
      <section className="bg-primary min-h-[530px] pattern flex flex-col justify-center items-center py-10 px-6">
        <h1 className="bg-black uppercase text-white font-work-sans text-5xl px-6 py-3 text-center font-extrabold sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl my-5 ">
          Pitch Your Startup,
          <br />
          Connect With Entrepreneurs
        </h1>
        <p className="text-white text-2xl max-w-3xl font-work-sans">
          Sumbit Ideas, Vote on Pitches, and Get Noticed.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-[30px] font-semibold font-work-sans">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>

        <ul className="grid mt-7 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="text-[30px] font-semibold font-work-sans">
              No startups found
            </p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}

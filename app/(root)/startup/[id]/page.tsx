import StartupCard, { StartupCardType } from "@/components/ui/StartupCard";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID } from "@/sanity/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/ui/View";

export const experimental_ppr = true;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const md = markdownit();
  const id = (await params).id;

  const [post, { select: editorStartups }] = await Promise.all([
    client.fetch(STARTUP_BY_ID, {
      id,
    }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full bg-primary pattern min-h-[230px] py-10 px-6">
        <p className="bg-secondary px-6 py-3 font-bold rounded-sm text-[22px] uppercase relative tag-tri ">
          {formatDate(post?._createdAt)}
        </p>
        <h1 className="font-extrabold text-white bg-black py-6 px-5 uppercase sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          {post.title}
        </h1>
        <p className="text-white font-medium text-[20px] break-words max-w-2xl text-center">
          {post.description}
        </p>
      </section>
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <img
          className="mt-7 rounded-xl w-full h-auto"
          src={post.image}
          alt="thumbnail"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link
              className="flex gap-2 items-center mb-3"
              href={`/user/${post.author?._id}`}
            >
              <Image
                className="rounded-full drop-shadow-lg h-[48px] "
                src={post.author?.image || ""}
                alt="avatar"
                width={48}
                height={48}
              ></Image>
              <div>
                <p className="text-black-100 text-xl font-bold">
                  {post.author?.name}
                </p>
                <p className="text-black-300 text-xl">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p className="bg-primary rounded-2xl text-white py-2 px-4">
              {post.category}
            </p>
          </div>
          <h3 className="text-3xl font-bold">Pitch Details</h3>

          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p>No details provided.</p>
          )}
        </div>

        <hr className=" bg-zinc-400 max-w-4xl my-10 mx-auto" />
        {editorStartups.length > 0 && (
          <div className="max-w-4-xl mx-auto">
            <p className="text-[30px] font-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorStartups.map((startup: StartupCardType) => (
                <StartupCard key={startup._id} post={startup} />
              ))}
            </ul>
          </div>
        )}
        <Suspense
          fallback={
            <Skeleton className=" bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />
          }
        >
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
}

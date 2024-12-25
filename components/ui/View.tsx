import { after } from "next/server";
import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export default async function View({ id }: { id: string }) {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="flex justify-end items-center fixed mt-5 bottom-3 right-3 bg-primary-100 py-2 px-4 rounded-lg">
      <div className="absolute -top-2 -right-2 ">
        <Ping />
      </div>
      <p className="text-sm font-semibold text-black">
        <span>{totalViews} views</span>
      </p>
    </div>
  );
}

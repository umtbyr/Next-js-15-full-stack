import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "./skeleton";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

export default function StartupCard({ post }: { post: StartupCardType }) {
  const {
    _createdAt,
    author,
    _id,
    title,
    description,
    image,
    category,
    views,
  } = post;

  return (
    <li className="bg-white rounded-[22px] border-black border-[5px] shadow-md px-5 py-6 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100 group">
      <div className="flex justify-between items-center ">
        <p className="font-work-sans font-medium  bg-primary-100 text-[16px] px-4 py-2 rounded-full group-hover:bg-white-100 ">
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-[16px] font-semibold">{views}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 gap-5 ">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="font-medium text-[16px] text-black line-clamp-1">
              {author?.name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="font-semibold text-[30px] text-black line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            className="rounded-full size-12"
            src={image || ""}
            width={48}
            height={48}
            alt="placeholder"
          ></Image>
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="font-normal text-[16px] line-clamp-2 break-all my-3 text-black-100">
          {description}
        </p>
        <img
          src={image}
          alt="placeholder"
          className="w-full  h-[164px] rounded-lg object-cover"
        />
      </Link>
      <div className="flex justify-between items-center gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="font-medium text-[16px] text-black-100 ">{category}</p>
        </Link>
        <Button className=" rounded-3xl bg-black text-white-100" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
}

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup_card_skeleton" />
      </li>
    ))}
  </>
);

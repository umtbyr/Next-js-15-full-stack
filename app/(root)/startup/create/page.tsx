import StartupForm from "@/components/ui/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <section className="w-full bg-primary pattern min-h-[230px] flex flex-col justify-center items-center px-6 py-10">
        <h1 className="bg-black text-white break-words font-extrabold uppercase sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          Create Your Startup!{" "}
        </h1>
      </section>
      <StartupForm />
    </>
  );
}

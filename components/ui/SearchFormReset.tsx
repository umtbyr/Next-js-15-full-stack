"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
export default function SearchFormReset() {
  const router = useRouter();

  const reset = () => {
    const form = document.getElementById("search-form") as HTMLFormElement;
    if (form) {
      form.reset();
      router.push("/", { scroll: false });
    }
  };

  return (
    <Button
      type="reset"
      onClick={reset}
      className="flex justify-center items-center bg-black size-[50px] rounded-full  text-white font-work-sans text-2xl !!important "
    >
      <X className="size-5" />
    </Button>
  );
}

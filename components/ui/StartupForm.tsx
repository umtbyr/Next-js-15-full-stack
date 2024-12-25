"use client";
import { Input } from "./input";
import { useActionState, useState } from "react";
import { Textarea } from "./textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./button";
import { Send } from "lucide-react";
import { formSchema } from "@/app/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createStartup } from "@/app/lib/actions";
export default function StartupForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };
      await formSchema.parseAsync(formValues);

      const result = await createStartup(prevState, formData, pitch);
      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup has been created succesfully",
        });
        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check your inputs and try again.",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation failed. ", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "An unexpected error has occured. ",
        variant: "destructive",
      });
      return {
        ...prevState,
        error: "An unexpected error has occured. ",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });
  const [pitch, setPitch] = useState("");

  return (
    <form
      action={formAction}
      className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6"
    >
      <div>
        <label
          htmlFor="title"
          className="font-bold text-[18px] text-black uppercase"
        >
          Title
        </label>
        <Input
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important"
          id="title"
          name="title"
          required
          placeholder="Startup Title"
        />
        {errors.tittle && (
          <p className="text-[18px] text-red-500 mt-2 ml-5 ">{errors.title}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="font-bold text-[18px] text-black uppercase"
        >
          Description
        </label>
        <Textarea
          className="border-[3px] border-black px-5 py-5 text-[18px] text-black font-semibold rounded-3xl mt-3 placeholder:text-black-300 !important"
          id="description"
          name="description"
          required
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="text-[18px] text-red-500 mt-2 ml-5 ">
            {errors.description}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="category"
          className="font-bold text-[18px] text-black uppercase"
        >
          Category
        </label>
        <Input
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important"
          id="category"
          name="category"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />
        {errors.category && (
          <p className="text-[18px] text-red-500 mt-2 ml-5 ">
            {errors.category}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="link"
          className="font-bold text-[18px] text-black uppercase"
        >
          Image URL
        </label>
        <Input
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important"
          id="link"
          name="link"
          required
          placeholder="Startup Image URL"
        />
        {errors.link && (
          <p className="text-[18px] text-red-500 mt-2 ml-5 ">{errors.link}</p>
        )}
      </div>
      <div data-color-mode="light">
        <label
          htmlFor="pitch"
          className="font-bold text-[18px] text-black uppercase"
        >
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves.",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && (
          <p className="text-[18px] text-red-500 mt-2 ml-5 ">{errors.pitch}</p>
        )}
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="w-full py-5 px-2 rounded-full bg-primary border-[2px] border-black text-white text-[18px]"
      >
        <div className="flex items-center justify-between">
          <p>{isPending ? "Submitting..." : "Submit Your Startup"}</p>
          <Send className="size-6 ml-2" />
        </div>
      </Button>
    </form>
  );
}

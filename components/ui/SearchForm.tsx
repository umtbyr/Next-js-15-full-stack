import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
import { Button } from "./button";
export default function SearchForm({ query }: { query?: string }) {
  return (
    <Form
      action="/"
      id="search-form"
      scroll={false}
      className="max-w-3xl w-full bg-white border-[5px] border-black rounded-[80px] text-2xl mt-8 px-5 py-1 flex items-center gap-5"
    >
      <input
        defaultValue={query}
        placeholder="Search Startups"
        name="query"
        className="py-2 flex-1 font-bold placeholder:font-semibold font-work-sans placeholder:text-black-100 h-auto outline-none w-full"
      />
      <div className="flex gap-2 ">
        {query && <SearchFormReset />}
        <Button
          type="submit"
          className="flex justify-center items-center bg-black rounded-full size-[50px] text-2xl text-white"
        >
          <Search className="size-5" />
        </Button>
      </div>
    </Form>
  );
}

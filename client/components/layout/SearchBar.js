import React, { useContext, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { BooksContext } from "@/pages/_app";
import { getGoogleBooks } from "@/actions/google";
import { useRouter } from "next/router";

export default function SearchBar({ setContent }) {
  const router = useRouter();
  const { setSearchResults, setDataLoading } = useContext(BooksContext);

  const [searchTerm, setSearchTerm] = useState("");
  const onInputChange = async (e) => {
    if (!e.target.value) {
      setSearchTerm("");
      setContent("discover");
    }
    setSearchTerm(e.target.value);
  };

  const onSubmit = async () => {
    setDataLoading(true);
    getGoogleBooks(searchTerm)
      .then((res) => {
        setSearchResults(res);
        setDataLoading(false);
        router.push("/browse?content=search", undefined, { shallow: true });
      })
      .catch((err) => {
        console.log(err);
        setDataLoading(false);
      });
  };

  return (
    <div className="min-w-0 flex-1 lg:w-full">
      <div className="flex items-center pt-4 pb-2 sm:pb-4 lg:mx-auto lg:max-w-3xl xl:mx-0 lg:max-w-none">
        <div className="w-full">
          <label htmlFor="search" className="sr-only">
            Search Books...
          </label>
          <div>
            <div className="mt-2 flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs">
                  <MagnifyingGlassIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="search"
                  name="search"
                  id="search"
                  autoComplete="new-password"
                  className="block w-full rounded-none rounded-l-md py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm tracking-wide ring-inset ring-gray-300 focus:ring-transparent sm:text-sm sm:leading-6"
                  placeholder="Search for books..."
                  value={searchTerm}
                  onChange={onInputChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      onSubmit();
                    }
                  }}
                />
              </div>
              <button
                type="button"
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-8 py-2 text-sm font-regular tracking-wide text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-orange hover:text-white hover:cursor-pointer"
                onClick={onSubmit}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useContext, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { getGoogleBooks, getOLBooks } from "@/actions/google";
import { BooksContext } from "@/pages/_app";
import Loading from "../shared/Loading";

export default function SearchBar() {
  const { setSearchResults, dataLoading, setDataLoading } =
    useContext(BooksContext);
  const [searchTerm, setSearchTerm] = useState("");

  const onInputChange = async (e) => {
    if (!e.target.value) setBooks();
    setSearchTerm(e.target.value);
  };

  const onSubmit = async () => {
    setDataLoading(true);
    getGoogleBooks(searchTerm)
      .then((res) => {
        console.log(res)
        setSearchResults(res);
        setDataLoading(false);
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
                  className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-xs sm:text-sm tracking-wid focus:ring-orange sm:text-sm sm:leading-6"
                  placeholder="Search for books..."
                  value={searchTerm}
                  onChange={onInputChange}
                />
              </div>
              <button
                type="button"
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-8 py-2 text-sm font-regular tracking-wide text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-orange hover:text-white hover:cursor-pointer"
                onClick={onSubmit}
              >
                {dataLoading ? <Loading size={20} /> : "Search"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

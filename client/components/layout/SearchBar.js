import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { getGoogleBooks } from "@/actions/google";

export default function SearchBar({ setBooks }) {
  const [searchTerm, setSearchTerm] = useState("");

  const onInputChange = async (e) => {
    if (!e.target.value) setBooks();
    
    setSearchTerm(e.target.value);
    const result = await getGoogleBooks(e.target.value);
    
    setBooks(result?.data?.items);
  };

  return (
    <div className="min-w-0 flex-1 xl:px-6 xl:w-2/3">
      <div className="flex items-center px-2 lg:px-6 py-4 lg:mx-auto max-w-xl lg:max-w-3xl xl:mx-0 lg:max-w-none xl:px-0">
        <div className="w-full">
          <label htmlFor="search" className="sr-only">
            Search Books...
          </label>
          <div className="relative">
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
              className="pl-9 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-xs sm:text-sm sm:leading-6 tracking-wide"
              placeholder="Search for books..."
              value={searchTerm}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

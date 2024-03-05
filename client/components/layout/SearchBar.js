import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
    <div className="min-w-0 flex-1 md:px-6 xl:w-2/3">
      <div className="flex items-center px-2 md:px-6 py-4 md:mx-auto max-w-xl lg:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
        <div className="w-full">
          <label htmlFor="search" className="sr-only">
            Search Books...
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder=""
              type="search"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

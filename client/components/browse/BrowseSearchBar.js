import React, { useContext, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

import { BooksContext } from "pages/_app";
import SearchBar from "@layout/SearchBar";
import { searchGoogleBooks } from "@lib/actions/queries";

export default function BrowseSearchBar({ setContent }) {
  const router = useRouter();
  const { searchResults, setSearchResults, setDataLoading } =
    useContext(BooksContext);

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
    searchGoogleBooks(searchTerm)
      .then((res) => {
        setSearchResults({ query: searchTerm, data: res });
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
      <div
        className={classNames(
          "flex items-center pt-4 lg:mx-auto lg:max-w-3xl xl:mx-0 lg:max-w-none",
          { "pb-2 sm:pb-4": !searchResults?.query }
        )}
      >
        <div className="w-full">
          <label htmlFor="search" className="sr-only">
            Search Books...
          </label>
          <div>
            <div className="mt-2 flex rounded-md shadow-sm">
              <SearchBar
                className="rounded-none rounded-l-md"
                onInputChange={onInputChange}
                onSubmit={onSubmit}
                placeholder="Search for books..."
                searchTerm={searchTerm}
                withButton={true}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onSubmit();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

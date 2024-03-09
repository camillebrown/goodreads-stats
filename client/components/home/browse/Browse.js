import React, { useEffect, useState } from "react";
import Search from "./Search";

export default function Browse({ searchResults }) {
  const [content, setContent] = useState("discovery");

  useEffect(() => {
    if (searchResults) setContent("search");
  }, [searchResults]);

  return (
    <div>
      {content === "search" ? (
        <Search searchResults={searchResults} />
      ) : (
        <div className="py-4 sm:py-6 lg:w-full lg:max-w-full">
          <div className="w-full grid gap-x-6 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mid:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 xl:gap-x-8">
            PUTTING SOME SHIT HERE
          </div>
        </div>
      )}
    </div>
  );
}

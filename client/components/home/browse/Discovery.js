import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Browse from "./DiscoveryTabs/Browse";
import Categories from "./DiscoveryTabs/Categories";
import Search from "./Search";
import TopBooks from "./DiscoveryTabs/TopBooks";

export default function Discovery({ content, searchResults }) {
  const router = useRouter();

  const getContent = () => {
    switch (content) {
      case "search":
        return <Search searchResults={searchResults} />;
      case "browse":
        return <Browse />;
      case "top_books":
        return <TopBooks />;
      case "categories":
        return <Categories />;
      default:
        return <Browse />;
    }
  };

  useEffect(() => {
    if (searchResults) {
      router.push("/home?content=search", undefined, {
        shallow: true,
      });
    }
  }, [searchResults]);

  return (
    <div>
      {content === "search" ? (
        <Search searchResults={searchResults} />
      ) : (
        <div className="py-4 sm:py-6 lg:w-full lg:max-w-full">
          <div className="w-full grid gap-x-6 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mid:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 xl:gap-x-8">
            {getContent()}
          </div>
        </div>
      )}
    </div>
  );
}

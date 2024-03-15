import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Browse from "./DiscoveryTabs/Browse";
import Categories from "./DiscoveryTabs/Categories";
import Loading from "@/components/shared/Loading";
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

  if (!content)
    return (
      <Loading
        size={80}
        color="#15643d"
        containerClass="w-full mt-10 flex items-center justify-center"
      />
    );

  return (
    <div className="lg:w-full lg:max-w-full">
      {searchResults && (
        <h2 className="font-semibold text-base sm:text-lg uppercase tracking-widest text-gray-400 mt-2">
          Search Results
        </h2>
      )}
      {getContent()}
    </div>
  );
}

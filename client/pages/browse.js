import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import BackToContentButton from "@browse/BackToContentButton";
import BrowseSearchBar from "@browse/BrowseSearchBar";
import Categories from "@browse/BrowseTabs/Categories";
import Discover from "@browse/BrowseTabs/Discover";
import TopBooks from "@browse/BrowseTabs/TopBooks";
import SearchResults from "@browse/SearchResults";
import { useSearchResults } from "@hooks/useSearchResults";
import MainLayout from "@layout/MainLayout";
import Loading from "@shared/Loading";

export default function Browse() {
  const router = useRouter();
  const { query } = router;

  const [content, setContent] = useState("discover");
  const { searchResults, dataLoading } = useSearchResults();

  useEffect(() => {
    setContent(query?.content ? query?.content : "discover");
  }, [query]);

  useEffect(() => {
    if (!searchResults && query?.content === "search") {
      router.push("/browse?content=discover", undefined, { shallow: true });
    }
  }, [dataLoading, searchResults, query?.content, router]);

  const getContent = () => {
    switch (content) {
      case "search":
        return <SearchResults />;
      case "discover":
        return <Discover />;
      case "top_books":
        return <TopBooks />;
      case "categories":
        return <Categories />;
      default:
        return <Discover />;
    }
  };

  return (
    <MainLayout>
      <BrowseSearchBar setContent={setContent} />
      <BackToContentButton content={content} />
      {dataLoading ? (
        <Loading className="text-rich-salmon w-14 h-14 my-8" />
      ) : (
        <div className="lg:w-full lg:max-w-full my-6">{getContent()}</div>
      )}
    </MainLayout>
  );
}

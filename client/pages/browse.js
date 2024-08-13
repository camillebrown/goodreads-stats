import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";

import BackToContentButton from "@/components/browse/BackToContentButton";
import Loading from "@/components/shared/Loading";
import SearchBar from "@/components/layout/SearchBar";
import Search from "@/components/browse/Search";
import TopBooks from "@/components/browse/BrowseTabs/TopBooks";
import Discover from "@/components/browse/BrowseTabs/Discover";
import Categories from "@/components/browse/BrowseTabs/Categories";
import { BooksContext } from "./_app";
import MainLayout from "@/components/layout/MainLayout";

export default function Browse() {
  const router = useRouter();
  const { query } = router;

  const { searchResults, dataLoading } = useContext(BooksContext);
  const [content, setContent] = useState("discover");

  useEffect(() => {
    setContent(query?.content ? query?.content : "discover");
  }, [query]);

  useEffect(() => {
    if (!searchResults && query?.content === "search") {
      router.push("/browse?content=discover", undefined, { shallow: true });
    }
  }, [dataLoading, searchResults, query?.content]);

  const getContent = () => {
    switch (content) {
      case "search":
        return <Search searchResults={searchResults} />;
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
      <SearchBar setContent={setContent} />
      <BackToContentButton content={content} searchResults={searchResults} />
      {dataLoading ? (
        <Loading className="text-rich-salmon w-14 h-14 my-8" />
      ) : (
        <div className="lg:w-full lg:max-w-full my-6">{getContent()}</div>
      )}
    </MainLayout>
  );
}

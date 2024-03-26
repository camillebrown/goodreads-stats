import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";

import Browse from "@/components/browse/Browse";
import Loading from "@/components/shared/Loading";
import SearchBar from "@/components/layout/SearchBar";
import SideNav from "@/components/layout/SideNav";
import { BooksContext } from "./_app";

export default function Home() {
  const router = useRouter();
  const urlContent = router?.query?.content;
  const { searchResults, dataLoading } = useContext(BooksContext);

  const [content, setContent] = useState("discover");

  useEffect(() => {
    setContent(urlContent ? urlContent : "discover");
  }, [urlContent]);

  useEffect(() => {
    if (!searchResults && urlContent === "search") {
      router.push("/home?content=discover", undefined, { shallow: true });
    }
  }, [dataLoading, searchResults, urlContent, router]);

  return (
    <div className="h-full bg-light-gray">
      <SideNav />

      <div className="xl:pl-56 py-12 lg:py-4 font-raleway">
        <div className="px-10">
          <SearchBar setContent={setContent} />
          {searchResults && content !== "search" && (
            <button
              onClick={() =>
                router.push("/home?content=search", undefined, {
                  shallow: true,
                })
              }
              className="text-sm tracking-wide pl-0.5 my-1 text-gray-900 underline hover:text-deep-orange hover:cursor-pointer capitalize"
            >
              Back to '{searchResults?.query}' Results
            </button>
          )}
          {dataLoading ? (
            <Loading
              color="#15643d"
              containerClass="w-full flex justify-center mt-10"
            />
          ) : (
            <Browse content={content} />
          )}
        </div>
      </div>
    </div>
  );
}

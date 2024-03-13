import { useEffect, useContext, useState } from "react";

import Discovery from "@/components/home/browse/Discovery";
import Loading from "@/components/shared/Loading";
import SearchBar from "@/components/layout/SearchBar";
import SideNav from "@/components/home/SideNav";
import { BooksContext } from "./_app";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { dataLoading } = useContext(BooksContext);

  const [content, setContent] = useState(router?.query?.content);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => setContent(router?.query?.content), [router?.query?.content]);

  return (
    <div className="h-full bg-light-gray">
      <SideNav />

      <div className="xl:pl-56 py-12 lg:py-4 font-raleway">
        <div className="px-10">
          <SearchBar
            setContent={setContent}
            setSearchResults={setSearchResults}
          />
          {dataLoading ? (
            <Loading
              color="#15643d"
              containerClass="w-full flex justify-center mt-10"
            />
          ) : (
            <Discovery content={content} searchResults={searchResults} />
          )}
        </div>
      </div>
    </div>
  );
}

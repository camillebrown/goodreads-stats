import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";

import Discovery from "@/components/home/browse/Discovery";
import Loading from "@/components/shared/Loading";
import SearchBar from "@/components/layout/SearchBar";
import SideNav from "@/components/home/SideNav";
import { BooksContext } from "./_app";

export default function Home() {
  const router = useRouter();
  const urlContent = router?.query?.content;
  const { searchResults, dataLoading } = useContext(BooksContext);

  const [content, setContent] = useState("browse");

  useEffect(() => {
    setContent(urlContent ? urlContent : "browse");
  }, [urlContent]);

  useEffect(() => {
    if (searchResults && urlContent !== 'search') {
      router.push("/home?content=search", undefined, { shallow: true });
    }
  }, [dataLoading, searchResults, urlContent, router]);
  

  return (
    <div className="h-full bg-light-gray">
      <SideNav />

      <div className="xl:pl-56 py-12 lg:py-4 font-raleway">
        <div className="px-10">
          <SearchBar setContent={setContent} />
          {dataLoading ? (
            <Loading
              color="#15643d"
              containerClass="w-full flex justify-center mt-10"
            />
          ) : (
            <Discovery content={content} />
          )}
        </div>
      </div>
    </div>
  );
}

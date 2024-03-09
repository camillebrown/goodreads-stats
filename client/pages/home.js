import { useContext } from "react";

import Browse from "@/components/home/browse/Browse";
import Loading from "@/components/shared/Loading";
import SearchBar from "@/components/layout/SearchBar";
import SideNav from "@/components/home/SideNav";
import { BooksContext } from "./_app";

export default function Home() {
  const { searchResults, dataLoading } = useContext(BooksContext);

  return (
    <div className="h-full bg-light-gray">
      <SideNav />

      <div className="xl:pl-56 py-12 lg:py-4 font-raleway">
        <div className="px-10">
          <SearchBar />
          {dataLoading ? (
            <Loading containerClass="w-full flex justify-center mt-10" />
          ) : (
            <Browse searchResults={searchResults} />
          )}
        </div>
      </div>
    </div>
  );
}

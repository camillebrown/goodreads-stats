import { useContext } from "react";
import { Rating } from "react-simple-star-rating";

import SearchBar from "@/components/layout/SearchBar";
import SideNav from "@/components/home/SideNav";
import { BooksContext } from "./_app";

export default function Home() {
  const { searchResults } = useContext(BooksContext);

  return (
    <div className="h-full bg-light-gray">
      <SideNav />

      <div className="xl:pl-56 py-12 lg:py-4 font-raleway">
        <div className="px-10">
          <SearchBar />
          <h2 className="font-semibold text-base sm:text-lg uppercase tracking-widest text-gray-400">
            Search Results
          </h2>
          <div className="py-4 sm:py-8 lg:w-full lg:max-w-full">
            <div className="w-full grid gap-x-6 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mid:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 xl:gap-x-8">
              {searchResults?.map((r, idx) => (
                <a key={idx} href={`/books/${r.id}`} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={r?.volumeInfo?.imageLinks.thumbnail + '&fife=w800'}
                      alt={r?.volumeInfo?.title}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-semibold tracking-wide text-gray-700 truncate">
                    {r?.volumeInfo?.title}
                  </h3>
                  <h3 className="text-sm font-regular tracking-wide text-gray-400 truncate">
                    {r?.volumeInfo?.authors?.[0]}
                  </h3>
                  <Rating
                    size={10}
                    fillColor="#15643d"
                    initialValue={r?.volumeInfo?.averageRating || 0}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

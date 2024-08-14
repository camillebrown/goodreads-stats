import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ApiContext, UserContext } from "pages/_app";
import SearchBookDisplay from "@browse/SearchBookDisplay";
import { getUserBooks } from "@lib/actions/books";
import { generateImageLink } from "@lib/search_functions";
import Loading from "@shared/Loading";
import { getFullSearchResults } from "../../lib/search_functions";
import BookGridLayout from "../layout/BookGridLayout";

export default function SearchResults({ searchResults }) {
  const api = useContext(ApiContext);
  const { user } = useContext(UserContext);
  const [fullSearchResults, setFullSearchResults] = useState();

  //TODO: DO SOMETHING WITH THESE BOOK ERRORS
  const { data: userBooks, error: booksError } = useQuery({
    queryKey: ["books", user?._id],
    queryFn: () => getUserBooks(api, user),
    enabled: !!user && !!searchResults,
    retry: false,
  });

  useEffect(() => {
    if (userBooks && searchResults) {
      setFullSearchResults(getFullSearchResults(userBooks, searchResults));
    }
  }, [userBooks, searchResults]);

  if (searchResults && !fullSearchResults)
    return (
      <Loading
        className="w-14 h-14"
        containerClass="w-full flex justify-center mt-10"
      />
    );

    console.log(fullSearchResults)
  return (
    <div>
      <h2 className="font-semibold text-base sm:text-lg font-montserrat tracking-wider">
        Search Results
      </h2>
      <BookGridLayout>
        {fullSearchResults?.map((r, idx) => (
          <div key={idx} className="flex justify-center">
            <SearchBookDisplay
              imgSrc={generateImageLink(r?.volumeInfo?.imageLinks?.thumbnail)}
              title={r?.volumeInfo?.title}
              author={r?.volumeInfo?.authors?.[0]}
              rating={r?.volumeInfo?.averageRating}
              user_saved={r?.user_saved}
              book={r}
            />
          </div>
        ))}
      </BookGridLayout>
    </div>
  );
}

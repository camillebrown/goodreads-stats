import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import BookGridLayout from "../layout/BookGridLayout";
import GridBookDisplay from "../shared/GridBookDisplay";
import Loading from "@/components/shared/Loading";
import useBooks from "@/hooks/useBooks";
import { ApiContext, UserContext } from "@/pages/_app";
import { getUserBooks } from "@/actions/books";
import { getFullSearchResults } from "./search_functions";

export default function Search({ searchResults }) {
  const api = useContext(ApiContext);
  const { user } = useContext(UserContext);
  const { isSaving, saveToBooks } = useBooks();
  const [fullSearchResults, setFullSearchResults] = useState();

  const generateImageLink = (thumbnail) => {
    if (thumbnail) return `${thumbnail}&fife=w800`;
  };

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

  return (
    <div>
      <h2 className="font-semibold text-base sm:text-lg uppercase tracking-widest text-gray-400">
        Search Results
      </h2>
      <BookGridLayout>
        {fullSearchResults?.map((r, idx) => (
          <div key={idx}>
            <GridBookDisplay
              id={r?.id}
              imgSrc={generateImageLink(r?.volumeInfo?.imageLinks?.thumbnail)}
              title={r?.volumeInfo?.title}
              isSaving={isSaving}
              author={r?.volumeInfo?.authors?.[0]}
              rating={r?.volumeInfo?.averageRating}
              user_saved={r?.user_saved}
              book_saved_at={r?.book_saved_at}
              saveToBooks={saveToBooks}
              book={r}
            />
          </div>
        ))}
      </BookGridLayout>
    </div>
  );
}

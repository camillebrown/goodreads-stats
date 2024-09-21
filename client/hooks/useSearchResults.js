import { createContext, useContext, useEffect, useState } from "react";

import { getFullSearchResults } from "@lib/search_functions";
import { useBooks } from "./useBooks";

export const SearchResultsContext = createContext(null);

export const SearchResultsProvider = ({ children }) => {
  const { books } = useBooks();
  const [dataLoading, setDataLoading] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [fullSearchResults, setFullSearchResults] = useState(null);

  useEffect(() => {
    if (books && searchResults) {
      setFullSearchResults(getFullSearchResults(books, searchResults));
    }
  }, [books, searchResults]);

  return (
    <SearchResultsContext.Provider
      value={{
        dataLoading,
        setDataLoading,
        searchResults,
        setSearchResults,
        fullSearchResults,
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  );
};

export function useSearchResults() {
  return useContext(SearchResultsContext);
}

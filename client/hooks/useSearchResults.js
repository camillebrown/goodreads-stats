import { createContext, useContext, useEffect, useState } from "react";

import { getFullSearchResults } from "@lib/search_functions";
import { useBooks } from "./useBooks";

export const SearchResultsContext = createContext(null);

export const SearchResultsProvider = ({ children }) => {
  const { userBooks } = useBooks();
  const [dataLoading, setDataLoading] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [fullSearchResults, setFullSearchResults] = useState(null);

  useEffect(() => {
    if (userBooks && searchResults) {
      setFullSearchResults(getFullSearchResults(userBooks, searchResults));
    }
  }, [userBooks, searchResults]);

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

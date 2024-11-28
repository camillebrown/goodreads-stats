import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ApiContext, UserContext } from "pages/_app";
import { getNYTBooks } from "@lib/actions/queries";
import useToast from "./useToast";

export const DiscoveryBooksContext = createContext(null);

export const DiscoveryBooksProvider = ({ children }) => {
  const makeToast = useToast();
  const api = useContext(ApiContext);
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    data: nytBooks,
    error: nytBooksError,
    loading: nytBooksLoading,
  } = useQuery({
    queryKey: ["NYT_books", "current"],
    queryFn: getNYTBooks,
    enabled: !books,
    retry: false,
  });

  useEffect(() => {
    if (nytBooks) {
      setBooks(nytBooks);
    }
  }, [nytBooks]);

  return (
    <DiscoveryBooksContext.Provider
      value={{
        isSaving,
        setIsSaving,
        nytBooks,
        nytBooksLoading,
        nytBooksError,
      }}
    >
      {children}
    </DiscoveryBooksContext.Provider>
  );
};

export function useDiscoveryBooks() {
  return useContext(DiscoveryBooksContext);
}

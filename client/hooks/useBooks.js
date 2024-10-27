import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ApiContext, queryClient, UserContext } from "pages/_app";
import { deleteBook, getUserBooks, updateBook } from "@lib/actions/books";
import { bookSortOptions, tableTabs } from "@lib/constants/variables";
import { sortDatesAsc, sortDatesDesc } from "@lib/date_formatters";
import useToast from "./useToast";

export const BooksContext = createContext(null);

export const BooksProvider = ({ children }) => {
  const makeToast = useToast();
  const api = useContext(ApiContext);
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [globalFilter, setGlobalFilter] = useState();
  const [statusFilter, setStatusFilter] = useState(tableTabs[0].type);
  const [selectedSort, setSelectedSort] = useState(bookSortOptions[0]);

  const {
    data: userBooks,
    isLoading: booksLoading,
    error: booksError,
    refetch: refetchBooks,
    isRefetching: refetchingBooks,
  } = useQuery({
    queryKey: ["books", user?._id],
    queryFn: () => getUserBooks(api, user),
    enabled: !!user && !books,
    retry: false,
  });

  const consolidatedBooks = useMemo(() => {
    if (!books) return [];
    const consolidated = sortAndFilterBooks(books, selectedSort, statusFilter);

    return consolidated;
  }, [books, selectedSort, statusFilter, sortAndFilterBooks]);

  useEffect(() => {
    setBooks(userBooks);
  }, [userBooks]);

  async function updateUserBook(r) {
    setIsSaving(r?._id);
    await updateBook(api, r)
      .then((res) => {
        makeToast("Book successfully updated", "success", "px-8");
        refetchBooks();
        setIsSaving(false);
      })
      .catch((err) => {
        console.log(err);

        let msg;
        if (err.response.data.message) {
          msg = err.response.data.message;
        } else {
          msg = "An Error Occurred: Unable to update book. Please try again.";
        }
        makeToast(msg, "error", "px-16");
        setIsSaving(false);
      });
  }

  async function deleteUserBook(r) {
    setIsSaving(r);
    await deleteBook(api, r)
      .then(() => {
        makeToast("Book deleted from your library", "success", "px-8");
        queryClient.invalidateQueries({ queryKey: ["books"] });
        setIsSaving(false);
      })
      .catch((err) => {
        console.log("Error deleting book", err);
        let msg;
        if (err.response.status === 400) {
          msg = err.response.data.message;
        } else {
          msg = "An Error Occurred: Unable to save book to library.";
        }
        makeToast(msg, "error", "px-16");
        setIsSaving(false);
      });
  }

  function sortAndFilterBooks(books, sort, filter) {
    const filteredBooks = books.filter((b) => {
      if (filter === "all") return b;
      return b.status === filter;
    });
    const sortByField = (field, direction) => {
      return filteredBooks.slice().sort((a, b) => {
        if (a[field] < b[field]) return direction === "asc" ? -1 : 1;
        if (a[field] > b[field]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    };

    switch (sort.type) {
      case "date_desc":
        return sortDatesDesc(filteredBooks);
      case "date_asc":
        return sortDatesAsc(filteredBooks);
      case "rating_desc":
        return sortByField("rating", "desc");
      case "rating_asc":
        return sortByField("rating", "asc");
      case "pages_desc":
        return sortByField("page_count", "desc");
      case "pages_asc":
        return sortByField("page_count", "asc");
      default:
        return sortDatesDesc(filteredBooks);
    }
  }

  // TODO: DELETE UNUSED PARAMS && PARSE OUT SEARCH RESULT INFO FOR BROWSE
  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        booksLoading,
        booksError,
        refetchBooks,
        refetchingBooks,
        consolidatedBooks,
        isSaving,
        setIsSaving,
        deleteUserBook,
        updateUserBook,
        globalFilter,
        setGlobalFilter,
        sortAndFilterBooks,
        statusFilter,
        setStatusFilter,
        selectedSort,
        setSelectedSort,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export function useBooks() {
  return useContext(BooksContext);
}

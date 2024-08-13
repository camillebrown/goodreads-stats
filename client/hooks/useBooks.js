import { useContext, useState } from "react";
import { ApiContext } from "@/pages/_app";

import useToast from "./useToast";
import { deleteBook, createBook } from "@/lib/actions/books";
import { queryClient } from "@/pages/_app";
import { sortDatesAsc, sortDatesDesc } from "@/lib/date_formatters";

export default function useBooks() {
  const makeToast = useToast();
  const api = useContext(ApiContext);
  const [isSaving, setIsSaving] = useState(false);

  function saveToBooks(r) {
    setIsSaving(r.id);
    createBook(api, r)
      .then(() => {
        makeToast("Book added to your library!", "success", "px-8");
        queryClient.invalidateQueries({ queryKey: ["books"] });
        setIsSaving(false);
      })
      .catch((err) => {
        console.log(err);
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

  function deleteUserBook(r) {
    setIsSaving(r);
    deleteBook(api, r)
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

  function sortBooks(books, sort) {
    const sortByField = (field, direction) => {
      return books.slice().sort((a, b) => {
        if (a[field] < b[field]) return direction === "asc" ? -1 : 1;
        if (a[field] > b[field]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    };

    switch (sort.type) {
      case "date_desc":
        return sortDatesDesc(books);
      case "date_asc":
        return sortDatesAsc(books);
      case "rating_desc":
        return sortByField("rating", "desc");
      case "rating_asc":
        return sortByField("rating", "asc");
      case "pages_desc":
        return sortByField("page_count", "desc");
      case "pages_asc":
        return sortByField("page_count", "asc");
      default:
        return sortDatesDesc(books);
    }
  }

  return { isSaving, saveToBooks, deleteUserBook, sortBooks };
}

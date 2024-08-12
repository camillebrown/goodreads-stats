import { useContext, useState } from "react";
import { ApiContext } from "@/pages/_app";

import useToast from "./useToast";
import { deleteBook, createBook } from "@/lib/actions/books";
import { queryClient } from "@/pages/_app";

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
        console.log(err)
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
        console.log('Error deleting book', err)
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

  return { isSaving, saveToBooks, deleteUserBook };
}

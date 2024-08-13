import React, { useContext, useEffect } from "react";
import { BooksContext } from "@/pages/_app";
import { useQuery } from "@tanstack/react-query";

import { getNYTBooks } from "@lib/actions/queries";

export default function Discover() {
  const { books, setBooks } = useContext(BooksContext);

  // const { data: nytBooks, error: nytBooksError } = useQuery({
  //   queryKey: ["NYT_books", "current"],
  //   queryFn: getNYTBooks,
  //   enabled: !books,
  //   retry: false,
  // });

  // useEffect(() => {
  //   if (nytBooks) {
  //     setBooks(nytBooks);
  //   }
  // }, [nytBooks]);

  // console.log({ books });

  return <div>Discover</div>;
}

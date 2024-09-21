import React from "react";

import { useBooks } from "@hooks/useBooks";
import BookGridLayout from "@layout/BookGridLayout";
import { generateImageLink } from "@lib/search_functions";
import HomeGridBookItem from "./HomeGridBookItem";

export default function HomeGridDisplay() {
  const { consolidatedBooks, statusFilter } = useBooks();

  // TODO: ADD BANNER TO PUSH TO DISCOVER PAGE
  if (!consolidatedBooks.length)
    return (
      <p className="w-full my-3">
        No {statusFilter ? statusFilter : "saved"} books yet.
      </p>
    );

  return (
    <BookGridLayout>
      {consolidatedBooks?.map((r, idx) => (
        <div key={idx} className="flex justify-center">
          <HomeGridBookItem imgSrc={generateImageLink(r?.img)} book={r} />
        </div>
      ))}
    </BookGridLayout>
  );
}

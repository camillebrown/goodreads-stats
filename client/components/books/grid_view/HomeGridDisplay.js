import React from "react";

import BookGridLayout from "@layout/BookGridLayout";
import { generateImageLink } from "@lib/search_functions";
import HomeGridBookItem from "./HomeGridBookItem";

export default function HomeGridDisplay({ sortedBooks }) {
  return (
    <BookGridLayout>
      {sortedBooks?.length > 0 ? (
        sortedBooks?.map((r, idx) => (
          <div key={idx} className="flex justify-center">
            <HomeGridBookItem imgSrc={generateImageLink(r?.img)} book={r} />
          </div>
        ))
      ) : (
        // TODO: ADD BANNER TO PUSH TO DISCOVER PAGE
        <p>No saved books yet.</p>
      )}
    </BookGridLayout>
  );
}

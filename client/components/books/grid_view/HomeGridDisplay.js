import React from "react";

import BookGridLayout from "@layout/BookGridLayout";
import { generateImageLink } from "@lib/search_functions";
import HomeGridBookItem from "./HomeGridBookItem";

export default function HomeGridDisplay({ filteredBooks }) {
  return (
    <BookGridLayout>
      {filteredBooks?.map((r, idx) => (
        <div key={idx} className="flex justify-center">
          <HomeGridBookItem imgSrc={generateImageLink(r?.img)} book={r} />
        </div>
      ))}
    </BookGridLayout>
  );
}

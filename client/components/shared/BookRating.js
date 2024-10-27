import React from "react";
import { Rating } from "react-simple-star-rating";

import { useBooks } from "@hooks/useBooks";
import Loading from "./Loading";

export default function BookRating({ book, status, rating }) {
  let content;
  const { isSaving, updateUserBook } = useBooks();

  const handleSetRating = (number) => {
    updateUserBook({ ...book, rating: number });
  };

  if (book?._id === isSaving)
    return (
      <Loading
        className="w-5 h-5 !text-rich-salmon"
        containerClass="!justify-start"
      />
    );

  if (rating) {
    content = (
      <Rating
        size={18}
        fillColor="#F8442D"
        initialValue={rating}
        className="leading-3"
        onClick={handleSetRating}
      />
    );
  } else if (!rating && status === "read") {
    content = (
      <Rating
        size={18}
        fillColor="#FEAC26"
        initialValue={rating || 0}
        className="leading-3"
        onClick={handleSetRating}
      />
    );
  } else {
    content = (
      <span className="inline-flex items-center rounded-md bg-tertiary-gray/30 px-2 py-1 text-xs font-medium text-tertiary-gray ring-1 ring-inset ring-tertiary-gray">
        Not Yet Rated
      </span>
    );
  }

  return content;
}

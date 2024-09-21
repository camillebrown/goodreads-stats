import React from "react";
import { Rating } from "react-simple-star-rating";

export default function BookRating({ status, rating }) {
  let content;

  if (rating) {
    content = (
      <Rating
        size={20}
        fillColor="#F8442D"
        initialValue={rating}
        className="leading-3"
      />
    );
  } else if (!rating && status === "read") {
    // TODO: Add a button to add a rating!
    content = "Add Rating Button";
  } else {
    content = (
      <span className="inline-flex items-center rounded-md bg-tertiary-gray/30 px-2 py-1 text-xs font-medium text-tertiary-gray ring-1 ring-inset ring-tertiary-gray">
        Not Yet Rated
      </span>
    );
  }

  return content;
}

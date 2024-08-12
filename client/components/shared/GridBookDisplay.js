import React from "react";
import classNames from "classnames";
import { Rating } from "react-simple-star-rating";

import BookActionButton from "./BookActionButton";

export default function GridBookDisplay({
  author,
  book,
  imgSrc,
  rating,
  title,
  user_saved,
}) {
  return (
    <div>
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
        <div
          className={classNames("absolute top-1.5 right-0.5 group", {
            "cursor-pointer": !user_saved,
          })}
        >
          <BookActionButton book={book} isUserBook={user_saved} />
        </div>
      </div>
      <h3 className="mt-2 text-sm font-semibold tracking-wide text-primary-gray truncate">
        {title}
      </h3>
      <h3 className="text-sm font-regular tracking-wide text-secondary-gray truncate">
        {author}
      </h3>
      <Rating
        size={10}
        fillColor="#FEAC26"
        initialValue={rating || 0}
        readonly
        className="leading-3"
      />
      {user_saved && (
        <p className="font-semibold text-xs text-baby-blue">In Your Library</p>
      )}
    </div>
  );
}

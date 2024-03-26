import React from "react";
import classNames from "classnames";
import { Rating } from "react-simple-star-rating";

import AnimatedSaveBook from "./animated/AnimatedSaveBook";

export default function GridBookDisplay({
  id,
  author,
  book,
  book_saved_at,
  imgSrc,
  isSaving,
  rating,
  saveToBooks,
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
          className={classNames("absolute top-1 right-1 m-0.5 group", {
            "cursor-pointer": !user_saved,
          })}
          onClick={() => {
            !user_saved && saveToBooks(book);
          }}
        >
          <AnimatedSaveBook
            size="w-8 h-8"
            iconColor="stroke-white"
            isLoading={isSaving === id}
            addBGColor="stroke-sage group-hover:stroke-green"
            successBGColor="stroke-orange"
            isUserBook={user_saved}
            createdAt={book_saved_at}
          />
        </div>
      </div>
      <h3 className="mt-2 text-sm font-semibold tracking-wide text-gray-900 truncate">
        {title}
      </h3>
      <h3 className="text-sm font-regular tracking-wide text-gray-400 truncate">
        {author}
      </h3>
      <Rating
        size={10}
        fillColor="#15643d"
        initialValue={rating || 0}
        readonly
        className="leading-3"
      />
      {user_saved && (
        <p className="font-semibold text-xs text-orange">In Your Library</p>
      )}
    </div>
  );
}

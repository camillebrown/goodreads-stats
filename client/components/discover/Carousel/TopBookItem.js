import React from "react";
import classNames from "classnames";

export default function TopBookItem({ idx, book, bgColors }) {
  return (
    <div key={book.title} className="text-white w-[90%] mx-auto overflow-x-hidden">
      <div className="flex p-10 space-x-12">
        <img
          src={book.book_image}
          className="w-56 h-auto shadow-2xl object-cover"
          alt={book.title}
        />
        <div className="h-60 flex flex-col justify-between">
          <div>
          <div className="flex items-end justify-between">
            <p className="capitalize font-bold text-3xl tracking-wide">
              {book.title.toLowerCase()}
            </p>
            <p className="font-bold text-5xl">#{book.rank}</p>
          </div>
          <p className="font-montserrat text-sm mt-1 mb-4">
            {book.contributor}
          </p>
          <p className="font-montserrat text-sm font-light tracking-wide">
            {book.description}
          </p>
          </div>
          <button
            className={classNames(
              "px-4 py-2 rounded-lg bg-white font-semibold transition shadow-xl w-full mb-4 hover:scale-[1.025]",
              bgColors[idx].textColor,
              bgColors[idx].shadowColor
            )}
          >
            See Book
          </button>
        </div>
      </div>
    </div>
  );
}

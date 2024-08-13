import classNames from "classnames";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";

import BookActionButton from "../shared/BookActionButton";

export default function SearchBookDisplay({
  author,
  book,
  imgSrc,
  rating,
  title,
  user_saved,
}) {
  return (
    <div
      className={classNames(
        "group p-3 rounded-lg max-w-52 transition-transform duration-500 transform relative origin-center hover:absolute hover:w-[16.5%] hover:!z-[1000] hover:scale-105 hover:shadow-2xl hover:bg-white hover:mx-auto"
      )}
    >
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover object-center rounded-lg"
        />
        <div
          className={classNames("absolute top-1.5 right-0.5 group", {
            "cursor-pointer": !user_saved,
          })}
        >
          <BookActionButton book={book} isUserBook={user_saved} />
        </div>
      </div>
      <div className="transition duration-500 text-center">
        <h3 className="mt-2 text-sm font-semibold tracking-wide text-primary-gray truncate">
          {title}
        </h3>
        <h3 className="text-sm font-regular tracking-wide text-secondary-gray truncate">
          {author}
        </h3>
        <div className="hidden group-hover:inline">
          <button className="my-2 text-sm font-semibold rounded-md bg-baby-blue text-white hover:bg-baby-blue/90 px-4 py-2">
            See Details
          </button>
        </div>
        <div className="inline group-hover:hidden">
          <Rating
            size={10}
            fillColor="#FEAC26"
            initialValue={rating || 0}
            readonly
            className="leading-3"
          />
          {user_saved && (
            <p className="font-semibold text-xs text-baby-blue">
              In Your Library
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

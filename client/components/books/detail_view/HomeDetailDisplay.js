import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";

import { generateImageLink } from "@lib/search_functions";

export default function HomeDetailDisplay({ sortedBooks }) {
  console.log(sortedBooks);
  const getStatusTag = (tag) => {
    switch (tag) {
      case "tbr":
        return "Want To Read";
      case "current":
        return "Currently Reading";
      case "read":
        return "Read";
      default:
        return "Uncategorized";
    }
  };
  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <div className="mt-2 divide-y divide-gray-800">
        {sortedBooks.map((book) => (
          <div key={book._id} className="flex items-center gap-6 py-6">
            <img
              src={generateImageLink(book?.img)}
              alt={book?.title}
              className="h-full w-full max-h-60 max-w-40 object-fill object-center rounded-lg"
            />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col gap-0.5">
                  <p className="font-semibold text-xl">{book?.title}</p>
                  <p className="text-baby-blue">{book?.author}</p>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <Rating
                    size={20}
                    fillColor="#F8442D"
                    initialValue={book?.rating}
                    className="leading-3"
                    readonly={book?.status !== "read"}
                  />
                  <div className="text-sm text-tertiary-gray">
                    {!book?.avg_rating ? (
                      "No Avg Rating"
                    ) : (
                      <div className="text-primary-gray font-semibold text-xl">
                        <p>
                          {book?.avg_rating}
                          <span className="text-sm text-tertiary-gray font-normal mx-1">
                            / 5 stars
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm">
                  {book?.description?.split(". ").slice(0, 4).join(". ") +
                    "...."}
                </p>
                <Link
                  href={`/${book?._id}`}
                  className="max-w-28 font-semibold text-baby-blue flex items-center gap-1.5 hover:text-baby-blue/70"
                >
                  <p>View More</p>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
                <div className="flex gap-2 mt-2">
                  {book?.categories.map((c) => {
                    return (
                      <span className="inline-flex items-center rounded-md bg-lavendar/20 px-2 py-1 text-xs font-medium text-lavendar ring-1 ring-inset ring-lavendar/20">
                        {c}
                      </span>
                    );
                  })}
                  <span className="inline-flex items-center rounded-md bg-salmon/20 px-2 py-1 text-xs font-medium text-rich-salmon ring-1 ring-inset ring-salmon/20">
                    {getStatusTag(book?.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

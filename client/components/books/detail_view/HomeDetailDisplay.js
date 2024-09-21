import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import BookRating from "@components/shared/BookRating";
import BookStatus from "@components/shared/BookStatus";
import { useBooks } from "@hooks/useBooks";
import { generateImageLink } from "@lib/search_functions";

export default function HomeDetailDisplay() {
  const { consolidatedBooks, statusFilter } = useBooks();
  
  if (!consolidatedBooks?.length)
    return (
      <div className="my-3">
        No {statusFilter ? statusFilter : "saved"} books yet.
      </div>
    );

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <div className="mt-2 divide-y">
        {consolidatedBooks.map((book) => {
          return (
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
                    <BookRating status={book?.status} rating={book?.rating} />
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
                <p className="text-sm pb-1">
                  {book?.description?.split(". ").slice(0, 4).join(". ") +
                    "...."}
                </p>
                <div className="group">
                  <Link
                    href={`/books/${book?._id}`}
                    className="max-w-max font-semibold text-baby-blue flex items-center gap-1.5 border-b border-transparent hover:text-dark-blue hover:border-dark-blue"
                  >
                    <p>View More Details</p>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-xs"
                    />
                  </Link>
                </div>
                <div className="flex gap-2 pt-1">
                  {book?.categories.map((c) => {
                    return (
                      <span
                        key={c}
                        className="inline-flex items-center rounded-md bg-lavendar/20 px-2 py-1 text-xs font-medium text-lavendar ring-1 ring-inset ring-lavendar/20"
                      >
                        {c}
                      </span>
                    );
                  })}
                  <BookStatus book={book} status={book?.status} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

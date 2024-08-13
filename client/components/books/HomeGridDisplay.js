import { useState } from "react";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import DeleteBookModal from "../modals/DeleteBookModal";

export default function HomeGridDisplay({ book, imgSrc }) {
  // TODO: CHANGE TO USEMODAL HOOK
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  return (
    <>
      <DeleteBookModal
        modalActive={modalActive}
        toggleModal={toggleModal}
        book={book}
      />
      <div className="group p-3 rounded-lg">
        <div className="relative aspect-h-1 aspect-w-1 w-full min-h-72 overflow-hidden rounded-lg bg-transparent xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={imgSrc}
            alt={book?.book_title}
            className="h-full w-full object-cover object-center rounded-lg"
          />
        </div>
        <div className="transition duration-500 text-center">
          <h3 className="mt-2 text-sm font-semibold tracking-wide text-primary-gray truncate">
            {book?.book_title}
          </h3>
          <h3 className="text-sm font-regular tracking-wide text-secondary-gray truncate">
            {book?.author}
          </h3>
          <div className="flex flex-col gap-3">
            <Rating
              size={20}
              fillColor="#FEAC26"
              initialValue={book?.rating || 0}
              className="leading-3"
            />
            <Link
              href={`/books/${book._id}`}
              className="text-sm font-semibold rounded-md bg-baby-blue text-white hover:bg-baby-blue/90 px-4 py-2"
            >
              See Details
            </Link>
            <button
              className="text-xs font-semibold rounded-md border border-rich-salmon text-rich-salmon hover:border-salmon hover:bg-salmon hover:text-white p-2"
              onClick={toggleModal}
            >
              Remove Book From Library
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

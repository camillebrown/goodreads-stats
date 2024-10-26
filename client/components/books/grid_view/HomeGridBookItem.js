import Link from "next/link";
import { Rating } from "react-simple-star-rating";

import Tooltip from "@components/shared/Tooltip";
import useModal from "@hooks/useModal";
import DeleteBookModal from "../../modals/DeleteBookModal";

export default function HomeGridBookItem({ book, imgSrc }) {
  const { modalActive, toggleModal } = useModal();

  return (
    <>
      <DeleteBookModal
        modalActive={modalActive}
        toggleModal={toggleModal}
        book={book}
      />
      <div className="group p-3 rounded-lg">
        <div className="relative aspect-h-1 aspect-w-1 w-full 2xl:min-h-72 overflow-hidden rounded-lg bg-transparent xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={imgSrc}
            alt={book?.book_title}
            className="h-full w-full max-h-[17rem] max-w-48 object-fill object-center rounded-lg"
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
            <Tooltip
              tooltip_text="Ratings only allowed for read books."
              container_class="px-4 bg-gray-100 text-sm font-medium"
              placement="top"
              disabled={book?.status === "read"}
            >
              <Rating
                size={20}
                fillColor="#FEAC26"
                initialValue={book?.rating || 0}
                className="leading-3"
                readonly={book?.status !== "read"}
              />
            </Tooltip>
            <Link
              href={`/books/${book?._id}`}
              className="text-sm font-semibold rounded-md bg-baby-blue text-white hover:bg-baby-blue/90 px-4 py-2"
            >
              See Details
            </Link>
            <button
              className="text-xs font-semibold rounded-md border border-rich-salmon text-rich-salmon hover:border-salmon hover:bg-salmon hover:text-white p-2"
              onClick={toggleModal}
            >
              <p>
                Remove Book{" "}
                <span className="hidden 2xl:inline">From Library</span>
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

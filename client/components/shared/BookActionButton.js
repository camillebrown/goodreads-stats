import { useContext, useState } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeartCircleCheck,
  faHeartCircleMinus,
  faHeart as fasHeart,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ApiContext } from "pages/_app";
import DeleteBookModal from "@components/modals/DeleteBookModal";
import { useBooks } from "@hooks/useBooks";
import useModal from "@hooks/useModal";
import useToast from "@hooks/useToast";
import { createBook } from "@lib/actions/books";
import Loading from "@shared/Loading";

export default function BookActionButton({ book, isUserBook }) {
  const api = useContext(ApiContext);
  const makeToast = useToast();
  const { modalActive, setModalActive, toggleModal } = useModal();
  const { isSaving, setIsSaving, refetchBooks } = useBooks();

  const [isHovered, setIsHovered] = useState(false);

  const saveToBooks = async (r) => {
    setIsSaving(r.id);
    await createBook(api, r)
      .then(() => {
        makeToast("Book added to your library!", "success", "px-8");
        refetchBooks();
        setIsSaving(false);
      })
      .catch((err) => {
        console.log(err);
        let msg;
        if (err.response.status === 400) {
          msg = err.response.data.message;
        } else {
          msg = "An Error Occurred: Unable to save book to library.";
        }
        makeToast(msg, "error", "px-16");
        setIsSaving(false);
      });
  };

  const getIconStack = () => {
    if (isSaving === book?.id)
      return (
        <span className="fa-layers fa-fw text-[40px]">
          <FontAwesomeIcon icon={faSquare} className="text-white" />
          <Loading className="w-4 h-4 text-gold" />
        </span>
      );

    if (isUserBook) {
      return (
        <span
          className="fa-layers fa-fw text-[40px] cursor-pointer group"
          onClick={() => setModalActive(true)}
        >
          <FontAwesomeIcon
            icon={faSquare}
            className="text-rich-salmon group-hover:text-white"
          />
          <FontAwesomeIcon
            icon={isHovered ? faHeartCircleMinus : faHeartCircleCheck}
            className="text-lg text-white group-hover:text-rich-salmon"
          />
        </span>
      );
    } else {
      return (
        <span
          className="fa-layers fa-fw text-[40px] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            !isUserBook && saveToBooks(book);
          }}
        >
          <FontAwesomeIcon icon={faSquare} className="text-white" />
          <FontAwesomeIcon
            icon={isHovered ? fasHeart : faHeart}
            className="text-rich-salmon text-lg"
          />
        </span>
      );
    }
  };

  return (
    <>
      <DeleteBookModal
        modalActive={modalActive}
        toggleModal={toggleModal}
        book={book}
      />
      <div className="transition-opacity duration-50">{getIconStack()}</div>
    </>
  );
}

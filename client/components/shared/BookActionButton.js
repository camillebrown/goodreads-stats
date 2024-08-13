import { useState } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeartCircleCheck,
  faHeartCircleMinus,
  faHeart as fasHeart,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DeleteBookModal from "@components/modals/DeleteBookModal";
import useBooks from "@hooks/useBooks";
import Loading from "@shared/Loading";

export default function BookActionButton({ book, isUserBook }) {
  const { isSaving, saveToBooks } = useBooks();
  const [isHovered, setIsHovered] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!modalActive);
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

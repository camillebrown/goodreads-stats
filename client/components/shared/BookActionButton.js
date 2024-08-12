import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faHeartCircleCheck,
  faHeartCircleMinus,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Loading from "./Loading";
import classNames from "classnames";
import useBooks from "@/hooks/useBooks";
import DeleteBookModal from "../modals/DeleteBookModal";

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
          className="fa-layers fa-fw text-[40px] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setModalActive(true)}
        >
          <FontAwesomeIcon
            icon={faSquare}
            className={isHovered ? "text-white" : "text-rich-salmon"}
          />
          <FontAwesomeIcon
            icon={isHovered ? faHeartCircleMinus : faHeartCircleCheck}
            className={classNames(
              "text-lg",
              isHovered ? "text-rich-salmon" : "text-white"
            )}
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
      <div className="transition-opacity duration-500">{getIconStack()}</div>
    </>
  );
}
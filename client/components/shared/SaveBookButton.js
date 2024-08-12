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

export default function SaveBookButton({ book, isUserBook }) {
  const { isSaving, saveToBooks, deleteUserBook } = useBooks();
  const [isHovered, setIsHovered] = useState(false);

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
          onClick={() => {
            // TODO: CHANGE THIS TO OPEN A MODAL!!!!
            isUserBook && deleteUserBook(book);
          }}
        >
          <FontAwesomeIcon
            icon={faSquare}
            className={isHovered ? "text-white" : "text-gold"}
          />
          <FontAwesomeIcon
            icon={isHovered ? faHeartCircleMinus : faHeartCircleCheck}
            className={classNames(
              "text-lg",
              isHovered ? "text-salmon" : "text-white"
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
            className="text-gold text-lg"
          />
        </span>
      );
    }
  };

  return (
    <div className="transition-opacity duration-500">{getIconStack()}</div>
  );
}

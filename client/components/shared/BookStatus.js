import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import ChangeBookStatusModal from "@components/modals/ChangeBookStatusModal";
import useModal from "@hooks/useModal";
import { statuses } from "@lib/constants/variables";

export default function BookStatus({ book, status }) {
  const { modalActive, toggleModal } = useModal();

  const matchStatus = () => {
    return (
      statuses.find((s) => s.value === status) || { title: "Uncategorized" }
    );
  };

  return (
    <>
      <ChangeBookStatusModal
        modalActive={modalActive}
        toggleModal={toggleModal}
        book={book}
      />
      <span
        className={classNames(
          "inline-flex items-center gap-x-0.5 rounded-md px-2 py-1 text-xs font-semibold border cursor-pointer",
          matchStatus()?.statusClass
        )}
      >
        {matchStatus()?.title}
        <button
          type="button"
          onClick={toggleModal}
          className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-salmon/20"
        >
          <span className="sr-only">Remove</span>
          <FontAwesomeIcon icon={faXmark} />
          <span className="absolute -inset-1" />
        </button>
      </span>
    </>
  );
}

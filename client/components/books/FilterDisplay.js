import React from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

import { useBooks } from "@hooks/useBooks";
import { tableTabs } from "@lib/constants/variables";
import BookFilterInput from "./BookFilterInput";

export default function FilterDisplay({ display, setDisplay }) {
  const { statusFilter, setStatusFilter } = useBooks();

  return (
    <div className="w-full flex items-center justify-between border rounded-lg text-sm mt-4">
      <div className="flex items-center">
        {tableTabs.map((tab) => {
          return (
            <p
              key={tab?.type}
              onClick={() => setStatusFilter(tab?.type)}
              className={classNames(
                "min-w-24 text-center py-2 px-4 cursor-pointer hover:bg-secondary-baby-blue/60 !border-r",
                tab?.className,
                { "rounded-l-lg": tab === tableTabs[0] },
                {
                  "bg-secondary-baby-blue/60 font-semibold":
                    tab?.type === statusFilter,
                }
              )}
            >
              {tab?.title}
            </p>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <Squares2X2Icon
            aria-hidden="true"
            onClick={() => setDisplay("grid")}
            className={classNames(
              "h-5 w-5",
              display === "grid"
                ? "text-salmon"
                : "cursor-pointer text-tertiary-gray hover:text-salmon"
            )}
          />
          <TableCellsIcon
            aria-hidden="true"
            onClick={() => setDisplay("list")}
            className={classNames(
              "h-5 w-5 cursor-pointer",
              display === "list"
                ? "text-salmon"
                : "cursor-pointer text-tertiary-gray hover:text-salmon"
            )}
          />
          <FontAwesomeIcon
            icon={faList}
            aria-hidden="true"
            onClick={() => setDisplay("detail")}
            className={classNames(
              "h-4 w-4",
              display === "detail"
                ? "text-salmon"
                : "cursor-pointer text-tertiary-gray hover:text-salmon"
            )}
          />
        </div>
        <BookFilterInput />
      </div>
    </div>
  );
}

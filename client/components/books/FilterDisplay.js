import React from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

import BookFilterInput from "./BookFilterInput";

export default function FilterDisplay({
  tabs,
  bookGroup,
  setBookGroup,
  display,
  setDisplay,
  selectedSort,
  setSelectedSort,
  sortOptions,
}) {
  return (
    <div className="w-full flex items-center justify-between border rounded-lg text-sm mt-4">
      <div className="flex items-center">
        {tabs.map((tab) => {
          return (
            <p
              key={tab?.type}
              onClick={() => setBookGroup(tab?.type)}
              className={classNames(
                "min-w-24 text-center py-2 px-4 cursor-pointer hover:bg-secondary-baby-blue/60 !border-r",
                tab?.className,
                {
                  "bg-secondary-baby-blue/60 font-semibold":
                    tab?.type === bookGroup,
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
            onClick={() => setDisplay("table")}
            className={classNames(
              "h-5 w-5 cursor-pointer",
              display === "table"
                ? "text-salmon"
                : "cursor-pointer text-tertiary-gray hover:text-salmon"
            )}
          />
          <FontAwesomeIcon
            icon={faList}
            aria-hidden="true"
            onClick={() => setDisplay("list")}
            className={classNames(
              "h-4 w-4",
              display === "list"
                ? "text-salmon"
                : "cursor-pointer text-tertiary-gray hover:text-salmon"
            )}
          />
        </div>
        <BookFilterInput
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          sortOptions={sortOptions}
        />
      </div>
    </div>
  );
}

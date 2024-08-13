import React from "react";
import BookFilterInput from "./BookFilterInput";
import { Bars3Icon, Squares2X2Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";

export default function FilterDisplay({
  display,
  setDisplay,
  selectedSort,
  setSelectedSort,
  sortOptions
}) {
  return (
    <div className="w-full flex items-center justify-between border rounded-lg text-sm mt-4">
      <div className="flex items-center font-semibold tracking-wide">
        <p className="min-w-24 text-center py-2 px-4 cursor-pointer hover:bg-secondary-baby-blue/60 rounded-l-lg !border-r">
          All
        </p>
        <p className="min-w-36 text-center py-2 px-4 cursor-pointer hover:bg-secondary-baby-blue/60 !border-r">
          Want To Read
        </p>
        <p className="min-w-36 text-center py-2 px-4 cursor-pointer hover:bg-secondary-baby-blue/60 !border-r">
          Currently Reading
        </p>
        <p className="min-w-36 text-center py-2 px-4 cursor-pointer hover:bg-secondary-baby-blue/60 !border-r">
          Read
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <Bars3Icon
            aria-hidden="true"
            onClick={() => setDisplay("list")}
            className={classNames(
              "h-5 w-5 cursor-pointer",
              display === "list"
                ? "text-salmon"
                : "cursor-pointer text-tertiary-gray hover:text-salmon"
            )}
          />
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

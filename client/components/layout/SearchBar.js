import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

export default function SearchBar({
  className,
  onInputChange,
  onKeyPress,
  onSubmit,
  placeholder,
  searchTerm,
  withButton,
}) {
  return (
    <div className="relative flex flex-grow items-stretch focus-within:z-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs">
        <MagnifyingGlassIcon
          className="h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        id="search"
        type="search"
        name="search"
        autoComplete="new-password"
        placeholder={placeholder}
        value={searchTerm}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        className={classNames(
          "block w-full py-1.5 pl-10 text-primary-gray placeholder:text-gray-400 text-xs sm:text-sm tracking-wide ring-inset ring-gray-300 focus:ring-transparent sm:text-sm sm:leading-6",
          className
        )}
      />
      {withButton && (
        <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-8 py-2 text-sm font-regular tracking-wide text-white bg-salmon ring-1 ring-inset ring-gray-300 hover:bg-rich-salmon hover:text-white hover:cursor-pointer"
          onClick={onSubmit}
        >
          Search
        </button>
      )}
    </div>
  );
}

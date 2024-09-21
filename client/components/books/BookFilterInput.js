import {
  faArrowDownShortWide,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { useBooks } from "@hooks/useBooks";
import { bookSortOptions } from "@lib/constants/variables";

export default function BookFilterInput() {
  const { selectedSort, setSelectedSort } = useBooks();

  const handleChange = (selectedType) => {
    const selectedOption = bookSortOptions.find(
      (option) => option.type === selectedType
    );
    setSelectedSort(selectedOption);
  };
  return (
    <Listbox value={selectedSort} onChange={handleChange}>
      <div className="relative border-l">
        <ListboxButton className="group relative w-full bg-white cursor-pointer text-primary-gray hover:text-salmon pl-3 pr-10 text-left sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <FontAwesomeIcon icon={faArrowDownWideShort} />
            <span className="ml-3 block truncate">{selectedSort?.title}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-secondary-gray group-hover:text-salmon"
            />
          </span>
        </ListboxButton>
        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {bookSortOptions.map((o, idx) => (
            <ListboxOption
              key={idx}
              value={o.type}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-baby-blue data-[focus]:text-white"
            >
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={
                    o.type.includes("desc")
                      ? faArrowDownWideShort
                      : faArrowDownShortWide
                  }
                  className={
                    o.type.includes("desc") ? "text-salmon" : "text-baby-blue"
                  }
                />
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {o.title}
                </span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

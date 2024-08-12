import React from "react";
import { Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function MobileNavButton({ open }) {
  return (
    <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
      <Popover.Button className="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-baby-blue focus:ring-opacity-50">
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open menu</span>
        {open ? (
          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
        )}
      </Popover.Button>
    </div>
  );
}

import React from "react";
import { Popover } from "@headlessui/react";

export default function MobileNavMenu({ user, userNavigation }) {
  return (
    <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
      <div className="border-t border-gray-200 pb-3 pt-4">
        <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
          <div>
            <div className="text-base font-medium text-gray-800">
              {user.name}
            </div>
            <div className="text-sm font-medium text-gray-500">
              {user.email}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
          {userNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </Popover.Panel>
  );
}

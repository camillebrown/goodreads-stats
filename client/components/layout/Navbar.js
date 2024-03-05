import { Popover } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useRouter } from "next/navigation";

import SearchBar from "./SearchBar";
import MobileNavMenu from "./MobileNavMenu";
import NavMenu from "./NavMenu";
import CTAButton from "../shared/CTAButton";

export default function Navbar({ setBooks }) {
  const router = useRouter();
  const userNavigation = [
    { name: "My Books", href: "/books" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/profile" },
  ];

  const user = {
    name: "Chelsea Hagon",
    email: "chelsea.hagon@example.com",
  };

  return (
    <Popover
      as="header"
      className={({ open }) =>
        classNames(
          open ? "fixed inset-0 z-40 overflow-y-auto" : "",
          "bg-white shadow-sm lg:static lg:overflow-y-visible"
        )
      }
    >
      {({ open }) => (
        <>
          <div className="mx-auto w-full py-0 md:py-8 lg:py-0 px-4 sm:px-4 lg:px-6">
            <div className="relative flex justify-between">
              <div className="flex items-center md:absolute md:inset-y-0 md:left-0 lg:static w-full md:w-4/5 xl:w-5/12 md:gap-2">
                <div className="flex flex-shrink-0 items-center w-1/12 md:px-2">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:inline w-[0.25px] h-1/2 bg-gray-400 my-auto" />
                <SearchBar setBooks={setBooks} />
              </div>
              <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
              <div className="hidden lg:flex lg:items-center lg:justify-end lg:gap-6 w-4/5 xl:w-7/12">
                <div className="flex flex-shrink-0 justify-end items-center gap-6 px-2">
                  <CTAButton
                    onClick={() => router.push("/login")}
                    buttonClass="bg-indigo-600 hover:bg-indigo-500"
                    buttonText="Login"
                  />
                </div>
                <div className="w-[0.25px] h-1/2 bg-gray-400 my-auto" />
                <div className="flex items-center justify-between gap-2">
                  <p className="hidden xl:inline text-xs text-gray-600 tracking-wide">
                    {user?.name}
                  </p>
                  <NavMenu userNavigation={userNavigation} />
                </div>
                <a href="/profile">
                  <Cog6ToothIcon
                    className="h-6 w-6 text-gray-500"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
          <MobileNavMenu userNavigation={userNavigation} user={user} />
        </>
      )}
    </Popover>
  );
}

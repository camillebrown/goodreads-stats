import { Popover } from "@headlessui/react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import CTAButton from "../shared/CTAButton";
import Divider from "../shared/Divider";
import MobileNavButton from "./MobileNavButton";
import MobileNavMenu from "./MobileNavMenu";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";

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
          open ? "fixed inset-0 z-40 h-min" : "",
          "bg-white shadow-md lg:static lg:overflow-y-visible"
        )
      }
    >
      {({ open }) => (
        <>
          <div className="mx-auto w-full py-0 md:py-8 lg:py-0 px-4 sm:px-4 lg:px-6">
            <div className="relative flex justify-between">
              <div className="flex items-center md:absolute md:inset-y-0 md:left-0 lg:static w-full md:w-4/5 xl:w-5/12 md:gap-2">
                <div className="flex flex-shrink-0 items-center sm:w-1/12">
                  <img
                    className="h-8 w-3/4 sm:w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <Divider height="h-1/2" color="bg-gray-400" />
                <SearchBar setBooks={setBooks} />
              </div>
              <MobileNavButton open={open} />
              <div className="hidden lg:flex lg:items-center lg:justify-end lg:gap-4 w-4/5 xl:w-7/12">
                <div className="flex flex-shrink-0 justify-end items-center gap-6 px-2">
                  <CTAButton
                    onClick={() => router.push("/login")}
                    buttonClass="bg-orange hover:bg-indigo-500"
                    buttonText="Login"
                  />
                </div>
                <Divider height="h-1/2" color="bg-gray-400" />
                <div className="flex items-center justify-between gap-2">
                  <p className="hidden xl:inline text-xs text-gray-600 tracking-wide">
                    {user?.name}
                  </p>
                  <NavMenu userNavigation={userNavigation} />
                  <a href="/profile">
                    <Cog6ToothIcon
                      className="h-6 w-6 text-sage"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <MobileNavMenu userNavigation={userNavigation} user={user} />
        </>
      )}
    </Popover>
  );
}

import React from "react";
import classNames from "classnames";
import {
  BookOpenIcon,
  ChartBarSquareIcon,
  GlobeAltIcon,
  PresentationChartBarIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";

export default function SideNav() {
  const browse = [
    { name: "Top Books", href: "#", icon: ChartBarSquareIcon, current: false },
    { name: "Discover", href: "#", icon: GlobeAltIcon, current: true },
    { name: "Categories", href: "#", icon: ServerIcon, current: false },
  ];
  const mybooks = [
    { name: "My Books", href: "#", icon: BookOpenIcon, current: false },
    {
      name: "Dashboard",
      href: "#",
      icon: PresentationChartBarIcon,
      current: false,
    },
  ];

  return (
    <div className="hidden xl:fixed xl:h-full xl:flex xl:w-56 xl:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-3 ring-1 ring-white/5 border-r">
        <nav className="flex flex-1 flex-col py-10 px-4 font-raleway text-xs divide-y">
          <div className="pb-8">
            <p className="font-semibold uppercase tracking-widest mx-1.5 mb-1 text-gray-400">
              Browse
            </p>
            {browse.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-sage/60 text-gray-800"
                      : "text-gray-800 hover:bg-sage/40",
                    "group flex items-center gap-x-3 rounded-md p-1.5 leading-3 font-semibold"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.name}
                </a>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <p className="font-semibold uppercase tracking-widest mx-1.5 mb-1 text-gray-400">
              Your Catalog
            </p>
            {mybooks.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-sage/60 text-gray-800"
                      : "text-gray-800 hover:bg-sage/40",
                    "group flex items-center gap-x-3 rounded-md p-1.5 leading-3 font-semibold"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

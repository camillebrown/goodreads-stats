import React from "react";
import {
  BookOpenIcon,
  ChartBarSquareIcon,
  GlobeAltIcon,
  PresentationChartBarIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function SideNav() {
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname)
  const browse = [
    {
      name: "Discover",
      onClickRoute: "/discover",
      icon: GlobeAltIcon,
      current: pathname === '/discover',
    },
    {
      name: "Top Books",
      onClickRoute: "/browse?content=top_books",
      icon: ChartBarSquareIcon,
      current: router?.query?.content === "top_books",
    },
    {
      name: "Categories",
      onClickRoute: "/browse?content=categories",
      icon: ServerIcon,
      current: router?.query?.content === "categories",
    },
  ];

  const mybooks = [
    {
      name: "My Books",
      href: "/books",
      icon: BookOpenIcon,
      current: pathname === "/books/",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: PresentationChartBarIcon,
      current: pathname === "/dashboard/",
    },
  ];

  return (
    <div className="hidden xl:fixed xl:h-full xl:flex xl:w-56 xl:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-3 ring-1 ring-white/5 border-r">
        <nav className="flex flex-1 flex-col gap-4 py-10 px-4 font-raleway text-xs divide-y">
          <div>
            <p className="font-semibold uppercase tracking-widest m-1.5 text-gray-400">
              Browse
            </p>
            {browse.map((item) => (
              <div key={item.name}>
                <div
                  onClick={() => {
                    router.push(item.onClickRoute, undefined, {
                      shallow: true,
                    });
                  }}
                  className={classNames(
                    item.current
                      ? "bg-secondary-baby-blue/60 text-primary-gray"
                      : "text-primary-gray hover:bg-secondary-baby-blue/60",
                    "group flex items-center gap-x-3 rounded-md p-1.5 leading-3 font-semibold cursor-pointer"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.name}
                </div>
              </div>
            ))}
          </div>

          <div className="py-4">
            <p className="font-semibold uppercase tracking-widest m-1.5 text-secondary-gray">
              Your Catalog
            </p>
            {mybooks.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-secondary-baby-blue/60 text-primary-gray"
                      : "text-primary-gray hover:bg-secondary-baby-blue/60",
                    "group flex items-center gap-x-3 rounded-md p-1.5 leading-3 font-semibold"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

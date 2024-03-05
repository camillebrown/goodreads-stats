import { Fragment, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import axios from "axios";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  const onInputChange = async (e) => {
    setSearchTerm(e.target.value);
    const result = await axios.get(
      `${API_URL}?q=${e.target.value}&maxResults=20&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );
    setBooks(result.data.items);
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between py-24">
        <div className="w-1/2">
          <label
            htmlFor="search"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Search Books....
          </label>
          <div className="mt-2">
            <input
              type="search"
              name="search"
              id="search"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Romance, Tia Williams, To Kill a Mockingbird"
              value={searchTerm}
              onChange={onInputChange}
            />
          </div>
          <div>
            {books.map((b, idx) => {
              return <p key={idx}>{b.volumeInfo.title}</p>;
            })}
          </div>
        </div>
      </main>
    </>
  );
}

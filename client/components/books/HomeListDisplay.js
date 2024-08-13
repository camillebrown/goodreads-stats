import React from "react";
import { difference_in_days } from "@/lib/date_formatters";

export default function HomeListDisplay({ userBooks }) {
  return (
    <div className="-mx-4 sm:-mx-0">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="text-salmon">
          <tr>
            <th
              scope="col"
              className="hidden px-1.5 py-3.5 text-left text-sm font-semibold lg:table-cell"
            >
              Title
            </th>
            <th
              scope="col"
              className="hidden px-1.5 py-3.5 text-left text-sm font-semibold sm:table-cell"
            >
              Author
            </th>
            <th
              scope="col"
              className="px-1.5 py-3.5 text-left text-sm font-semibold"
            >
              Categories
            </th>
            <th
              scope="col"
              className="px-1.5 py-3.5 text-left text-sm font-semibold"
            >
              Rating
            </th>
            <th
              scope="col"
              className="px-1.5 py-3.5 text-left text-sm font-semibold"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-1.5 py-3.5 text-left text-sm font-semibold"
            >
              Pages
            </th>
            <th
              scope="col"
              className="px-1.5 py-3.5 text-left text-sm font-semibold"
            >
              Reading Time (Days)
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {userBooks.map((book) => (
            <tr key={book?._id}>
              <td className="w-full max-w-0 py-1.5 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-0">
                <td className="hidden px-1.5 py-1.5 text-sm font-semibold text-baby-blue lg:table-cell cursor-pointer">
                  {book?.book_title}
                </td>
                <dl className="font-normal lg:hidden">
                  <dt className="sr-only">Title</dt>
                  <dd className="mt-1 truncate text-gray-700">{book?.title}</dd>
                  <dt className="sr-only sm:hidden">Email</dt>
                  <dd className="mt-1 truncate text-gray-500 sm:hidden">
                    {book?.email}
                  </dd>
                </dl>
              </td>
              <td className="hidden px-1.5 py-1.5 text-sm text-gray-500 sm:table-cell">
                {book?.author}
              </td>
              <td className="px-1.5 py-1.5 text-sm text-gray-500">
                {book?.categories.join(",")}
              </td>
              <td className="px-1.5 py-1.5 text-sm text-gray-500">
                {book?.rating === 0 ? (
                  "Not Yet Rated"
                ) : (
                  <Rating
                    size={20}
                    fillColor="#FEAC26"
                    initialValue={book?.rating}
                    className="leading-3"
                  />
                )}
              </td>
              <td className="px-1.5 py-1.5 text-sm text-gray-500">
                {book?.status}
              </td>
              <td className="px-1.5 py-1.5 text-sm text-gray-500">
                {book?.page_count}
              </td>
              <td className="px-1.5 py-1.5 text-sm text-gray-500">
                {!difference_in_days(book?.start_date, book?.end_date)
                  ? "No Reading Dates Log"
                  : difference_in_days(book?.start_date, book?.end_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

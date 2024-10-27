import Link from "next/link";

import BookRating from "@components/shared/BookRating";
import BookStatus from "@components/shared/BookStatus";
import { difference_in_days } from "@lib/date_formatters";

export const columns = [
  {
    accessorKey: "title",
    header: "Title",
    headerClassName: "hidden lg:table-cell",
    cell: ({ row: { original } }) => {
      return (
        <div className="w-full max-w-0 py-1.5 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-0">
          <Link
            href={`/books/${original._id}`}
            className="hidden px-1.5 py-1.5 text-sm font-semibold text-baby-blue hover:text-dark-blue lg:table-cell cursor-pointer"
          >
            {original?.title}
          </Link>
          <dl className="font-normal lg:hidden">
            <dd className="mt-1 truncate text-gray-700">
              Author: {original?.author}
            </dd>
            <dd className="mt-1 truncate text-gray-500 sm:hidden">
              {original?.author}
            </dd>
          </dl>
        </div>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    headerClassName: "hidden sm:table-cell",
    cellClassName: "hidden sm:table-cell",
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row: { original } }) => original?.categories.join(","),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row: { original } }) => (
      <BookRating
        book={original}
        status={original?.status}
        rating={original?.rating}
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original } }) => (
      <BookStatus book={original} status={original?.status} />
    ),
  },
  {
    accessorKey: "page_count",
    header: "Page Count",
  },
  {
    accessorFn: ({ row: original }) =>
      difference_in_days(original?.start_date, original?.end_date),
    header: "Reading Time (Days)",
    cell: ({ row: { original } }) => {
      if (original?.status !== "read")
        return <span className="font-medium text-gray-400">N/A</span>;

      return !difference_in_days(original?.start_date, original?.end_date)
        ? "Add Reading Dates Button"
        : difference_in_days(original?.start_date, original?.end_date);
    },
  },
];

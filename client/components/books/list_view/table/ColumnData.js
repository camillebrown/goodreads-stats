import { Rating } from "react-simple-star-rating";

import { difference_in_days } from "@/lib/date_formatters";

export const columns = [
  {
    accessorKey: "book_title",
    header: "Title",
    headerClassName: "hidden lg:table-cell",
    cell: ({ row: { original } }) => {
      return (
        <div className="w-full max-w-0 py-1.5 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-0">
          <div className="hidden px-1.5 py-1.5 text-sm font-semibold text-baby-blue hover:text-secondary-baby-blue lg:table-cell cursor-pointer">
            {original?.book_title}
          </div>
          <dl className="font-normal lg:hidden">
            <dd className="mt-1 truncate text-gray-700">Author: {original?.author}</dd>
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
    cell: ({ row: { original } }) =>
      original?.rating === 0 ? (
        "Not Yet Rated"
      ) : (
        <Rating
          size={20}
          fillColor="#FEAC26"
          initialValue={original?.rating}
          className="leading-3"
        />
      ),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "page_count",
    header: "Page Count",
  },
  {
    accessorFn: ({ row: original }) => {
      return !difference_in_days(original?.start_date, original?.end_date)
        ? "No Reading Dates Log"
        : difference_in_days(original?.start_date, original?.end_date);
    },
    header: "Reading Time (Days)",
  },
];

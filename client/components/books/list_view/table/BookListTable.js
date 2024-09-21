import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

import { columns } from "@books/list_view/table/ColumnData";
import SearchBar from "@layout/SearchBar";
import { useBooks } from "@hooks/useBooks";

export default function BookListTable() {
  const { consolidatedBooks: userBooks, statusFilter } = useBooks()
  const data = useMemo(() => userBooks || [], [userBooks]);
  const [globalFilter, setGlobalFilter] = useState("");

  const customFilterFn = (row, columnIds, filterValue) => {
    return columnIds.some((columnId) => {
      if (["book_title", "author"].includes(columnId)) {
        const cellValue = row.getValue(columnId);
        return String(cellValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
      }
      return false;
    });
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel({ filterFn: customFilterFn }),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="-mx-4 sm:-mx-0">
      <div className="mt-2 flex rounded-md shadow-sm">
        <SearchBar
          className="rounded-lg"
          onInputChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search your books..."
          searchTerm={globalFilter}
          withButton={false}
        />
      </div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="text-salmon">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={classNames(
                    "px-1.5 py-3.5 text-left text-sm font-semibold",
                    header.column.columnDef.headerClassName
                  )}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white text-sm">
          {!data.length ? (
            <tr>
              <td colSpan={columns.length} className="px-1.5 py-3.5">
                No {statusFilter === "tbr" ? "want to read" : statusFilter}{" "}
                books saved.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

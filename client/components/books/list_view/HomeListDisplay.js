import React from "react";

import BookListTable from "./table/BookListTable";

export default function HomeListDisplay({ sortedBooks }) {
  return (
    <div className="-mx-4 sm:-mx-0 mt-4">
      <BookListTable userBooks={sortedBooks} />
    </div>
  );
}

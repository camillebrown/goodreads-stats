import { useEffect, useState } from "react";

import HomeDetailDisplay from "@books/detail_view/HomeDetailDisplay";
import FilterDisplay from "@books/FilterDisplay";
import HomeGridDisplay from "@books/grid_view/HomeGridDisplay";
import HomeListDisplay from "@books/list_view/HomeListDisplay";
import { useBooks } from "@hooks/useBooks";
import MainLayout from "@layout/MainLayout";
import SearchBar from "@layout/SearchBar";
import Loading from "@shared/Loading";

export default function MyBooks() {
  const {
    booksLoading,
    statusFilter,
    globalFilter,
    setGlobalFilter,
    consolidatedBooks,
  } = useBooks();

  const [display, setDisplay] = useState("grid");
  const [filteredBooks, setFilteredBooks] = useState(consolidatedBooks);
  const statusFilterDisplay =
    statusFilter === "tbr" ? "want to read" : statusFilter;

  const getContent = () => {
    switch (display) {
      case "grid":
        return <HomeGridDisplay filteredBooks={filteredBooks} />;
      case "list":
        return <HomeListDisplay filteredBooks={filteredBooks} />;
      case "detail":
        return <HomeDetailDisplay filteredBooks={filteredBooks} />;
      default:
        return <HomeGridDisplay filteredBooks={filteredBooks} />;
    }
  };

  useEffect(() => {
    if (globalFilter) {
      setFilteredBooks(
        consolidatedBooks.filter((book) => {
          return Object.values(book).some((value) => {
            return value
              ?.toString()
              ?.toLowerCase()
              ?.includes(globalFilter.toLowerCase());
          });
        })
      );
    } else {
      setFilteredBooks(consolidatedBooks);
    }
  }, [globalFilter, consolidatedBooks]);

  return (
    <MainLayout>
      <div className="my-4">
        <h2 className="font-semibold uppercase text-base sm:text-2xl font-montserrat tracking-wide">
          Your Books
        </h2>
        <FilterDisplay display={display} setDisplay={setDisplay} />
        <div className="my-2">
          <SearchBar
            className="rounded-lg"
            onInputChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search your books..."
            searchTerm={globalFilter}
            withButton={false}
          />
        </div>

        {!filteredBooks.length ? (
          // TODO: ADD BANNER TO PUSH TO DISCOVER PAGE
          <p className="w-full my-3">
            No {statusFilterDisplay ? statusFilterDisplay : "saved"} books yet.
          </p>
        ) : booksLoading || !consolidatedBooks ? (
          <Loading className="text-rich-salmon w-14 h-14 my-8" />
        ) : (
          <div>{getContent()}</div>
        )}
      </div>
    </MainLayout>
  );
}

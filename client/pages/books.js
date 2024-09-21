import { useState } from "react";

import HomeDetailDisplay from "@books/detail_view/HomeDetailDisplay";
import FilterDisplay from "@books/FilterDisplay";
import HomeGridDisplay from "@books/grid_view/HomeGridDisplay";
import HomeListDisplay from "@books/list_view/HomeListDisplay";
import { useBooks } from "@hooks/useBooks";
import MainLayout from "@layout/MainLayout";
import Loading from "@shared/Loading";

export default function MyBooks() {
  const [display, setDisplay] = useState("grid");
  const { booksLoading, consolidatedBooks } = useBooks();

  const getContent = () => {
    switch (display) {
      case "grid":
        return <HomeGridDisplay />;
      case "list":
        return <HomeListDisplay />;
      case "detail":
        return <HomeDetailDisplay />;
      default:
        return <HomeGridDisplay />;
    }
  };

  return (
    <MainLayout>
      <div className="my-4">
        <h2 className="font-semibold uppercase text-base sm:text-2xl font-montserrat tracking-wide">
          Your Books
        </h2>
        <FilterDisplay display={display} setDisplay={setDisplay} />

        {/* TODO: ADD ABILITY TO SEARCH USER BOOKS! REACT TABLE GLOBAL FILTER */}
        {booksLoading || !consolidatedBooks ? (
          <Loading className="text-rich-salmon w-14 h-14 my-8" />
        ) : (
          <div>{getContent()}</div>
        )}
      </div>
    </MainLayout>
  );
}

import { useContext, useMemo, useState } from "react";
import FilterDisplay from "@/components/books/FilterDisplay";
import HomeGridDisplay from "@/components/books/grid_view/HomeGridDisplay";
import HomeListDisplay from "@/components/books/list_view/HomeListDisplay";
import { useQuery } from "@tanstack/react-query";

import { ApiContext, UserContext } from "pages/_app";
import useBooks from "@hooks/useBooks";
import MainLayout from "@layout/MainLayout";
import { getUserBooks } from "@lib/actions/books";
import Loading from "@shared/Loading";

export default function MyBooks() {
  const api = useContext(ApiContext);
  const { user } = useContext(UserContext);
  const { sortBooks } = useBooks();
  const sortOptions = [
    { title: "Newest to Oldest", type: "date_desc" },
    { title: "Oldest to Newest", type: "date_asc" },
    { title: "Rating (Desc)", type: "rating_desc" },
    { title: "Rating (Asc)", type: "rating_asc" },
    { title: "Pages (Desc)", type: "pages_desc" },
    { title: "Pages (Asc)", type: "pages_asc" },
  ];

  const tabs = [
    { title: "All", type: "all", className: "rounded-l-lg" },
    { title: "Want to Read", type: "tbr" },
    { title: "Currently Reading", type: "current" },
    { title: "Read", type: "read" },
  ];

  const [display, setDisplay] = useState("grid");
  const [bookGroup, setBookGroup] = useState(tabs[0].type);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  //TODO: DO SOMETHING WITH THESE BOOK ERRORS
  const {
    data: userBooks,
    isLoading: booksLoading,
    error: booksError,
  } = useQuery({
    queryKey: ["books", user?._id],
    queryFn: () => getUserBooks(api, user),
    enabled: !!user,
    retry: false,
  });

  const sortedBooks = useMemo(() => {
    if (userBooks) {
      const sorted = sortBooks(userBooks, selectedSort);
      return sorted;
    }
    return [];
  }, [userBooks, selectedSort, sortBooks]);

  return (
    <MainLayout>
      <div className="my-4">
        <h2 className="font-semibold uppercase text-base sm:text-2xl font-montserrat tracking-wide">
          Your Books
        </h2>
        <FilterDisplay
          tabs={tabs}
          bookGroup={bookGroup}
          setBookGroup={setBookGroup}
          display={display}
          setDisplay={setDisplay}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          sortOptions={sortOptions}
        />

        {/* TODO: ADD ABILITY TO SEARCH USER BOOKS! REACT TABLE GLOBAL FILTER */}
        {booksLoading || !sortedBooks ? (
          <Loading className="text-rich-salmon w-14 h-14 my-8" />
        ) : display === "grid" ? (
          <HomeGridDisplay sortedBooks={sortedBooks} />
        ) : (
          <HomeListDisplay sortedBooks={sortedBooks} />
        )}
      </div>
    </MainLayout>
  );
}

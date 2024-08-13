import { useContext, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ApiContext, UserContext } from "@/pages/_app";
import { getUserBooks } from "@/lib/actions/books";
import MainLayout from "@/components/layout/MainLayout";
import Loading from "@/components/shared/Loading";
import BookGridLayout from "../components/layout/BookGridLayout";
import { generateImageLink } from "@/lib/search_functions";
import HomeGridDisplay from "@/components/books/HomeGridDisplay";
import FilterDisplay from "@/components/books/FilterDisplay";
import HomeListDisplay from "@/components/books/HomeListDisplay";
import useBooks from "@/hooks/useBooks";

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

  const [display, setDisplay] = useState("grid");
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
  }, [userBooks, selectedSort]);

  return (
    <MainLayout>
      <div className="my-4">
        <h2 className="font-semibold uppercase text-base sm:text-2xl font-montserrat tracking-wide">
          Your Books
        </h2>
        <FilterDisplay
          display={display}
          setDisplay={setDisplay}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          sortOptions={sortOptions}
        />
        {booksLoading || !sortedBooks ? (
          <Loading className="text-rich-salmon w-14 h-14 my-8" />
        ) : display === "grid" ? (
          <BookGridLayout>
            {sortedBooks.length > 0 ? (
              sortedBooks.map((r, idx) => (
                <div key={idx} className="flex justify-center">
                  <HomeGridDisplay
                    imgSrc={generateImageLink(r?.img)}
                    book={r}
                  />
                </div>
              ))
            ) : (
              // TODO: ADD BANNER TO PUSH TO DISCOVER PAGE
              <p>No saved books yet.</p>
            )}
          </BookGridLayout>
        ) : (
          <HomeListDisplay userBooks={sortedBooks} />
        )}
      </div>
    </MainLayout>
  );
}

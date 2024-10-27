import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import HomeDetailDisplay from "@books/detail_view/HomeDetailDisplay";
import FilterDisplay from "@books/FilterDisplay";
import HomeGridDisplay from "@books/grid_view/HomeGridDisplay";
import HomeListDisplay from "@books/list_view/HomeListDisplay";
import { DisplayBanner } from "@components/shared/DisplayBanner";
import { useBooks } from "@hooks/useBooks";
import MainLayout from "@layout/MainLayout";
import SearchBar from "@layout/SearchBar";
import Loading from "@shared/Loading";

export default function MyBooks() {
  const {
    statusFilter,
    globalFilter,
    setGlobalFilter,
    consolidatedBooks,
    userBooksLoading,
  } = useBooks();

  const router = useRouter();
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
        <h2 className="font-semibold uppercase text-base sm:text-2xl font-montserrat tracking-wide m-2">
          Your Books
        </h2>
        <DisplayBanner
          bannerContentContainer="p-8"
          bannerImageHeight="h-48"
          direction="horizontal"
          bgClass="bg-[url(/discover-preview.png)] bg-[left_6.5rem_top_-5rem]"
          className="lg:col-span-3 lg:rounded-tr-4xl"
          description={
            <p>
              Search our collection of thousands of titles and authors,
              featuring the most popular, newly released titles.
              <span className="font-semibold text-baby-blue ml-1">
                Get started now!
              </span>
            </p>
          }
          fade={["left"]}
          onClick={() => router.push("/browse")}
          subHeadingText="Discover"
          title="Find new and exciting books"
        />
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

        {userBooksLoading || !consolidatedBooks ? (
          <Loading className="text-rich-salmon w-14 h-14 my-8" />
        ) : !filteredBooks.length ? (
          <p className="w-full my-6 font-semibold">
            You don't currently have any{" "}
            {statusFilterDisplay && statusFilterDisplay !== "all"
              ? statusFilterDisplay
              : "saved"}{" "}
            books yet.
          </p>
        ) : (
          <div className="my-8">{getContent()}</div>
        )}
      </div>
    </MainLayout>
  );
}

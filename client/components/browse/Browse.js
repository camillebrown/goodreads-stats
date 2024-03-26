import React, { useContext } from "react";

import Discover from "./BrowseTabs/Discover";
import Categories from "./BrowseTabs/Categories";
import Loading from "@/components/shared/Loading";
import Search from "./Search";
import TopBooks from "./BrowseTabs/TopBooks";
import { BooksContext } from "@/pages/_app";

export default function Browse({ content, viewResults }) {
  const { searchResults } = useContext(BooksContext);

  const getContent = () => {
    switch (content) {
      case "search":
        return <Search searchResults={searchResults} />;
      case "discover":
        return <Discover />;
      case "top_books":
        return <TopBooks />;
      case "categories":
        return <Categories />;
      default:
        return <Discover />;
    }
  };

  if (!content)
    return (
      <Loading
        size={80}
        color="#15643d"
        containerClass="w-full mt-10 flex items-center justify-center"
      />
    );

  return (
    <div className="lg:w-full lg:max-w-full">
      {getContent()}
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { Rating } from "react-simple-star-rating";

import useToast from "@/hooks/useToast";
import Loading from "@/components/shared/Loading";
import AnimatedSaveBook from "@/components/shared/animated/AnimatedSaveBook";
import { createBook, getUserBooks } from "@/actions/books";
import { ApiContext, queryClient, UserContext } from "@/pages/_app";
import { getFullSearchResults } from "./search_functions";

export default function Search({ searchResults }) {
  const api = useContext(ApiContext);
  const { user } = useContext(UserContext);
  const makeToast = useToast();
  const [fullSearchResults, setFullSearchResults] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const generateImageLink = (thumbnail) => {
    if (thumbnail) return `${thumbnail}&fife=w800`;
  };

  const saveToBooks = (r) => {
    setIsLoading(true);
    createBook(api, r)
      .then(() => {
        makeToast("Book added to your library!", "success", "px-8");
        queryClient.invalidateQueries({ queryKey: ["books"] });
        setIsLoading(false);
      })
      .catch((err) => {
        let msg;
        if (err.response.status === 400) {
          msg = err.response.data.message;
        } else {
          msg = "An Error Occurred: Unable to save book to library.";
        }
        makeToast(msg, "error", "px-16");
        setIsLoading(false);
      });
  };

  //TODO: DO SOMETHING WITH THESE BOOK ERRORS
  const { data: userBooks, error: booksError } = useQuery({
    queryKey: ["books", user?._id],
    queryFn: () => getUserBooks(api, user),
    enabled: !!user && !!searchResults,
    retry: false,
  });

  useEffect(() => {
    if (userBooks && searchResults) {
      setFullSearchResults(getFullSearchResults(userBooks, searchResults));
    }
  }, [userBooks, searchResults]);

  if (searchResults && !fullSearchResults)
    return (
      <Loading
        className="w-14 h-14"
        containerClass="w-full flex justify-center mt-10"
      />
    );

  return (
    <div>
      <h2 className="font-semibold text-base sm:text-lg uppercase tracking-widest text-gray-400">
        Search Results
      </h2>
      <div className="my-4 w-full grid gap-x-6 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mid:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 xl:gap-x-8">
        {fullSearchResults?.map((r, idx) => (
          <div key={idx}>
            <div
              key={idx}
              className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
            >
              <img
                src={generateImageLink(r?.volumeInfo?.imageLinks?.thumbnail)}
                alt={r?.volumeInfo?.title}
                className="h-full w-full object-cover object-center"
              />
              <div
                className={classNames("absolute top-1 right-1 m-0.5 group", {
                  "cursor-pointer": !r?.user_saved,
                })}
                onClick={() => {
                  !r?.user_saved && saveToBooks(r);
                }}
              >
                <AnimatedSaveBook
                  size="w-8 h-8"
                  iconColor="stroke-white"
                  isLoading={isLoading}
                  addBGColor="stroke-sage group-hover:stroke-green"
                  successBGColor="stroke-orange"
                  isUserBook={r?.user_saved}
                  createdAt={r?.book_saved_at}
                />
              </div>
            </div>
            <h3 className="mt-2 text-sm font-semibold tracking-wide text-gray-900 truncate">
              {r?.volumeInfo?.title}
            </h3>
            <h3 className="text-sm font-regular tracking-wide text-gray-400 truncate">
              {r?.volumeInfo?.authors?.[0]}
            </h3>
            <Rating
              size={10}
              fillColor="#15643d"
              initialValue={r?.volumeInfo?.averageRating || 0}
              readonly
              className="leading-3"
            />
            {r?.user_saved && (
              <p className="font-semibold text-xs text-orange">
                In Your Library
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

import useUser from "@/hooks/useUser";
import AnimatedSaveBook from "@/components/shared/animated/AnimatedSaveBook";

export default function Search({ searchResults }) {
  const { user } = useUser();
  const [isUserBook, setIsUserBook] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateImageLink = (thumbnail) => {
    if (thumbnail) return `${thumbnail}&fife=w800`;
  };

  const saveToBooks = (r) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsUserBook(true);
      setIsLoading(false);
    }, 1000);
  };

  return searchResults?.map((r, idx) => (
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
          className="absolute top-1 right-1 m-0.5 group cursor-pointer"
          onClick={() => saveToBooks(r?.id)}
        >
          <AnimatedSaveBook
            size="w-8 h-8"
            iconColor="stroke-white"
            isLoading={isLoading}
            addBGColor="stroke-sage"
            successBGColor="stroke-orange"
            isUserBook={isUserBook}
          />
        </div>
      </div>
      <h3 className="mt-2 text-sm font-semibold tracking-wide text-gray-700 truncate">
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
      />
    </div>
  ));
}

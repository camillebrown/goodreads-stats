import React from "react";
import extractSingleColor from 'image-color-extractor';

import Carousel from "@components/shared/Carousel";
import { useDiscoveryBooks } from "@hooks/useDiscoveryBooks";
import TopBookItem from "./TopBookItem";
import bg from '../../../styles/bg2.svg'

export default function TopBooksCarousel() {
  const { nytBooks } = useDiscoveryBooks();

  const bgColors = [
    {
      containerColor: "from-salmon/50 to-salmon",
      textColor: "text-salmon/90",
      shadowColor: "shadow-salmon/90 hover:!shadow-rich-salmon",
    },
    {
      containerColor: "from-secondary-baby-blue to-baby-blue",
      textColor: "text-baby-blue",
      shadowColor: "shadow-baby-blue hover:!shadow-dark-blue",
    },
    {
      containerColor: "from-lavendar/40 to-lavendar",
      textColor: "text-lavendar/80",
      shadowColor: "shadow-lavendar/80 hover:!shadow-lavendar",
    },
    {
      containerColor: "from-gold/70 to-deep-gold",
      textColor: "text-deep-gold",
      shadowColor: "shadow-deep-gold hover:!shadow-amber-600",
    },
    {
      containerColor: "from-green-700/40 to-green-700",
      textColor: "text-green-700",
      shadowColor: "shadow-green-700 hover:!shadow-green-900",
    },
  ];

  return (
    <div className="overflow-visible max-h-80 w-full -my-4">
      <Carousel>
        {nytBooks?.slice(0, 5)?.map((book, idx) => {
          extractSingleColor(bg)
          .then(color => console.log(color))
          .catch(error => console.error(error))
          return (
            <div
              key={idx}
              className="flex transition-transform duration-500 ease-out"
            >
              <div
                className="w-1/4 h-80"
                style={{
                  backgroundImage: `url('${nytBooks[idx === 0 ? 4 : idx - 1]?.book_image}')`,
                }}
              />
              <div
                className="h-80 w-full border-x-4 border-white w-3/5"
                style={{
                  backgroundImage: `url('${book.book_image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <TopBookItem
                  key={book.title}
                  book={book}
                  idx={idx}
                  bgColors={bgColors}
                />
              </div>
              <div className="w-1/5 h-80 !overflow-x-hidden">
                <div
                  className="h-80 border-x-4 border-white w-[400%]"
                  style={{
                    backgroundImage: `url('${nytBooks?.[idx === 4 ? 0 : idx + 1]?.book_image}')`,
                  }}
                >
                  <TopBookItem
                    key={nytBooks?.[idx === 4 ? 0 : idx + 1]?.title}
                    book={nytBooks?.[idx === 4 ? 0 : idx + 1]}
                    idx={idx === 4 ? 0 : idx + 1}
                    bgColors={bgColors}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

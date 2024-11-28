import React, { useEffect, useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 5000,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides?.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides?.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="relative w-full h-80 overflow-y-visible rounded-lg">
      {slides?.[curr]}

      <div className="absolute inset-0 max-h-max flex items-center justify-between px-8 p-4 my-auto">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full shadow bg-white/40 text-gray-600 hover:bg-white/60"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 rounded-full shadow bg-white/40 text-gray-600 hover:bg-white/60"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0 flex items-center justify-center gap-2">
        {slides?.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              curr === i ? "bg-white p-0.5" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

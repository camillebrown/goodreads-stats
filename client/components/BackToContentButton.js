import React from "react";
import { useRouter } from "next/router";

import { useSearchResults } from "@hooks/useSearchResults";

export default function BackToContentButton({ content }) {
  let buttonText;
  let contentTag;
  const router = useRouter();
  const { searchResults } = useSearchResults();

  if (searchResults && content !== "search") {
    buttonText = (
      <p>
        Back to <span className="capitalize">'{searchResults?.query}'</span>
        Results
      </p>
    );
    contentTag = "search";
  } else if (searchResults && content === "search") {
    buttonText = "Return to Browse New Books";
    contentTag = "discover";
  }

  if (!buttonText) return;

  return (
    <button
      onClick={() =>
        router.push(`/browse?content=${contentTag}`, undefined, {
          shallow: true,
        })
      }
      className="text-xs tracking-wider px-0.5 my-1 text-primary-gray underline hover:text-baby-blue hover:cursor-pointer"
    >
      {buttonText}
    </button>
  );
}

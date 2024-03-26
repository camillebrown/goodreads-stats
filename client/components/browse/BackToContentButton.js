import React from "react";
import { useRouter } from "next/router";

export default function BackToContentButton({ searchResults, content }) {
  const router = useRouter();
  let buttonText;
  let contentTag;

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

  console.log(searchResults);
  if (!buttonText) return;

  return (
    <button
      onClick={() =>
        router.push(`/browse?content=${contentTag}`, undefined, {
          shallow: true,
        })
      }
      className="text-xs font-serif tracking-widest pl-0.5 my-1 text-gray-900 underline hover:text-deep-orange hover:cursor-pointer"
    >
      {buttonText}
    </button>
  );
}

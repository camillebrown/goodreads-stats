import SearchBookDisplay from "@components/SearchBookDisplay";
import { useSearchResults } from "@hooks/useSearchResults";
import { generateImageLink } from "@lib/search_functions";
import Loading from "@shared/Loading";
import BookGridLayout from "./layout/BookGridLayout";

export default function SearchResults() {
  const { searchResults, fullSearchResults } = useSearchResults();

  if (searchResults && !fullSearchResults)
    return (
      <Loading
        className="w-14 h-14"
        containerClass="w-full flex justify-center mt-10"
      />
    );

  return (
    <div>
      <h2 className="font-semibold text-base sm:text-lg font-montserrat tracking-wider">
        Search Results
      </h2>
      <BookGridLayout>
        {fullSearchResults?.map((r, idx) => (
          <div key={idx} className="flex justify-center">
            <SearchBookDisplay
              imgSrc={generateImageLink(r?.volumeInfo?.imageLinks?.thumbnail)}
              title={r?.volumeInfo?.title}
              author={r?.volumeInfo?.authors?.[0]}
              rating={r?.volumeInfo?.averageRating}
              user_saved={r?.user_saved}
              book={r}
            />
          </div>
        ))}
      </BookGridLayout>
    </div>
  );
}

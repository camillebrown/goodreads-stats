import axios from "axios";

export const searchGoogleBooks = async (query) => {
  if (!query) return;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?q=${query}&maxResults=40&projection=full&printType=books&langRestrict=en&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );

    const seenTitles = new Set();
    const filteredItems = response.data.items
      .filter((item) => {
        const categories = item?.volumeInfo?.categories || [];
        const title = item?.volumeInfo?.title;

        const restrictedCategories = ["Juvenile Fiction", "Session laws"];
        const isRestricted = categories.some((category) =>
          restrictedCategories.includes(category)
        );
        if (isRestricted || item?.accessInfo?.viewability === "NO_PAGES") {
          return false;
        }

        if (seenTitles.has(title)) {
          return false;
        }

        seenTitles.add(title);
        return true;
      })
      .sort((a, b) => {
        const aIsFiction = a.volumeInfo.categories?.some((cat) =>
          cat.toLowerCase().includes("fiction")
        )
          ? 1
          : 0;
        const bIsFiction = b.volumeInfo.categories?.some((cat) =>
          cat.toLowerCase().includes("fiction")
        )
          ? 1
          : 0;

        if (aIsFiction !== bIsFiction) {
          return bIsFiction - aIsFiction;
        }

        // Finally, sort by rating
        const aRating = a.volumeInfo.averageRating || 0;
        const bRating = b.volumeInfo.averageRating || 0;
        return bRating - aRating;
      });

    return filteredItems;
  } catch (error) {
    console.error("Error searching Google Books:", error);
    return [];
  }
};

export const getNYTBooks = async () => {
  const approvedLists = [
    "combined-print-and-e-book-fiction",
    "combined-print-and-e-book-nonfiction",
    "hardcover-fiction",
    "trade-fiction-paperback",
    "young-adult-hardcover",
    "young-adult-paperback-monthly",
  ];

  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
    );

    const filteredItems = response.data.results.lists
      .filter((list) => approvedLists.includes(list?.list_name_encoded))
      .flatMap((list) => list.books);

    return filteredItems;
  } catch (error) {
    console.error("Error fetching NYT Books:", error);
    return [];
  }
};

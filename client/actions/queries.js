import axios from "axios";

export const searchGoogleBooks = async (query) => {
  if (!query) return;
  let seenTitles = new Set();

  const result = await axios
    .get(
      `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?q=${query}&maxResults=40&projection=full&printType=books&langRestrict=en&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    )
    .then((r) => {
      let filteredItems = r.data.items.filter((item) => {
        if (item?.volumeInfo?.categories?.includes("Juvenile Fiction"))
          return false;
        const title = item.volumeInfo.title;
        if (seenTitles.has(title)) {
          return false;
        } else {
          seenTitles.add(title);
          return true;
        }
      });
      return filteredItems;
    })
    .catch((err) => {
      console.log(err);
    });

  return result;
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

  const result = await axios
    .get(
      `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
    )
    .then((r) => {
      let filteredItems = [];
      r.data.results.lists.forEach((list) => {
        if (approvedLists.includes(list?.list_name_encoded)) {
          list.books.forEach((b) => filteredItems.push(b));
        }
      });
      return filteredItems;
    })
    .catch((err) => {
      console.log(err);
    });

  return result;
};

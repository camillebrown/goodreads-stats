import axios from "axios";


export const getGoogleBooks = async (query) => {
  if (!query) return;
  let seenTitles = new Set();

  const result = await axios
    .get(
      `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?q=${query}&maxResults=40&projection=full&printType=books&langRestrict=en&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    )
    .then((r) => {
      let filteredItems = r.data.items.filter(item => {
        if(item?.volumeInfo?.categories?.includes('Juvenile Fiction')) return false;
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
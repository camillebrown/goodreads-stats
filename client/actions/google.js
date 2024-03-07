import axios from "axios";


/////////////////////////////////////////////////////////////////////////////////
//       FIGURE OUT A DIFFERENT WAY TO DO THIS!! TOO MANY REQUESTS             //
/////////////////////////////////////////////////////////////////////////////////
export const getGoogleBooks = async (title, authorLast) => {
  if (!title) return;

  const result = await axios
    .get(
      `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?q=${title}+inauthor:${authorLast}&maxResults=20&orderBy=newest&langRestrict=en&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    )
    .then((r) => {
      const bestImage = r?.data?.items?.find(i=> i.volumeInfo?.imageLinks?.thumbnail)
      return bestImage?.volumeInfo?.imageLinks?.thumbnail;
    })
    .catch((err) => {
      console.log(err);
    });

  return result;
};

export const getOLBooks = async (query) => {
  if (!query) return;
  const result = await axios.get(
    `https://openlibrary.org/search.json?q=${query}&lang=en&fields=key,title,author_name,publish_date,isbn,number_of_pages_median,want_to_read_count,already_read_count&sort=new`
  );

  if (result) {
    const results = result.data.docs.map((r) => {
      let author = r.author_name[0].split(" ");
      let authorLast = author[author.length - 1];
      let title = r.title;

      return getGoogleBooks(title, authorLast).then((res) => {
        if(!res) return 
        return { ...r, image: res };
      });
    });
    console.log(results);
  }
  return;
};

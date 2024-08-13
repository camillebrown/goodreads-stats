export const getUserBooks = (api, user) => {
  return api
    .get(`/api/books/${user?._id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("unable to get books");
    });
};

export const createBook = (api, book) => {
  const formattedBook = {
    google_id: book.id,
    book_title: book.volumeInfo?.title,
    author: book.volumeInfo?.authors[0],
    page_count: book.volumeInfo?.pageCount,
    description: book.volumeInfo?.description,
    categories: book.volumeInfo?.categories,
    img: book.volumeInfo?.imageLinks?.thumbnail,
  };

  return api.post("/api/books", { ...formattedBook });
};

export const deleteBook = (api, book) => {
  return api.delete(`/api/books/${book?._id}`);
};

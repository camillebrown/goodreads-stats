export const getFullSearchResults = (userBooks, searchResults) => {
  const savedBooksLookup = new Map();
  userBooks.forEach((book) => {
    savedBooksLookup.set(book.google_id, {
      _id: book._id,
      saved: true,
      createdAt: book.createdAt,
    });
  });

  const enrichedSearchResults = searchResults?.data
    ?.map((result) => {
      return {
        ...result,
        _id: savedBooksLookup?.get(result.id)?._id,
        user_saved: savedBooksLookup.has(result.id),
        book_saved_at: savedBooksLookup.has(result.id)
          ? savedBooksLookup?.get(result.id)?.createdAt
          : null,
      };
    })
    .sort((a, b) => {
      const aUserSaved = a.user_saved ? 1 : 0;
      const bUserSaved = b.user_saved ? 1 : 0;
      if (aUserSaved !== bUserSaved) {
        return bUserSaved - aUserSaved;
      }
    });
  return enrichedSearchResults;
};

export const generateImageLink = (thumbnail) => {
  if (thumbnail) return `${thumbnail}&fife=w800`;
};

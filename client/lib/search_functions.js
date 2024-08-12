export const getFullSearchResults = (userBooks, searchResults) => {
  const savedBooksLookup = new Map();
  userBooks.forEach((book) => {
    savedBooksLookup.set(book.google_id, {
      saved: true,
      createdAt: book.createdAt,
    });
  });

  const enrichedSearchResults = searchResults?.data
    ?.map((result) => {
      return {
        ...result,
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

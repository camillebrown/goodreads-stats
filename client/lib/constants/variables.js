export const statuses = [
  { value: "tbr", title: "Want to Read" },
  { value: "current", title: "Currently Reading" },
  { value: "read", title: "Read" },
];

export const bookSortOptions = [
  { title: "Newest to Oldest", type: "date_desc" },
  { title: "Oldest to Newest", type: "date_asc" },
  { title: "Rating (Desc)", type: "rating_desc" },
  { title: "Rating (Asc)", type: "rating_asc" },
  { title: "Pages (Desc)", type: "pages_desc" },
  { title: "Pages (Asc)", type: "pages_asc" },
];

export const tableTabs = [
  { title: "All", type: "all", className: "rounded-l-lg" },
  { title: "Want to Read", type: "tbr" },
  { title: "Currently Reading", type: "current" },
  { title: "Read", type: "read" },
];

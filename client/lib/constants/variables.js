export const statuses = [
  {
    value: "tbr",
    title: "Want to Read",
    statusClass:
      "bg-salmon/20 text-rich-salmon border-salmon/20 hover:bg-salmon/40",
  },
  {
    value: "current",
    title: "Currently Reading",
    statusClass:
      "bg-deep-gold/20 text-deep-gold border-deep-gold/20 hover:bg-deep-gold/30",
  },
  {
    value: "read",
    title: "Read",
    statusClass:
      "bg-lavendar/20 text-lavendar border-lavendar/20 hover:bg-lavendar/30",
  },
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

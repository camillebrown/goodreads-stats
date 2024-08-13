import React from "react";

export default function BookGridLayout({ children }) {
  return (
    <div className="my-4 w-full grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mid:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 xl:gap-x-4 relative">
      {children}
    </div>
  );
}

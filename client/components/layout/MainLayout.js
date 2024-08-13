import React from "react";
import SideNav from "./SideNav";

export default function MainLayout({ children }) {
  return (
    <div className="h-full">
      <SideNav />

      <div className="xl:pl-56 py-12 lg:py-4 font-raleway">
        <div className="px-10">{children}</div>
      </div>
    </div>
  );
}

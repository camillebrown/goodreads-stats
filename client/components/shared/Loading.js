import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loading({ containerClass }) {
  return (
    <div className={containerClass}>
      <Oval
        height="80"
        width="80"
        radius="9"
        color="#15643d"
        ariaLabel="oval-shape-loading"
        wrapperClass
        secondaryColor="#49916d"
      />
    </div>
  );
}

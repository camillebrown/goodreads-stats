import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loading({ size, containerClass }) {
  return (
    <div className={containerClass}>
      <Oval
        height={size}
        width={size}
        radius="9"
        color="#15643d"
        ariaLabel="oval-shape-loading"
        wrapperClass
        secondaryColor="#49916d"
      />
    </div>
  );
}

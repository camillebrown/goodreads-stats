import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loading({ size, color, containerClass }) {
  return (
    <div className={containerClass}>
      <Oval
        height={size}
        width={size}
        radius="9"
        color={color}
        ariaLabel="oval-shape-loading"
        wrapperClass
        secondaryColor="#49916d"
      />
    </div>
  );
}

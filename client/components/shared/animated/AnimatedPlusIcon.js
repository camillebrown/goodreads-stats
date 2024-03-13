import React from "react";
import classNames from "classnames";

import Loading from "../Loading";

export default function AnimatedPlusIcon({
  addBGColor,
  iconColor,
  isLoading,
  size,
}) {
  return isLoading ? (
    <Loading
      size={18}
      color="#fff"
      containerClass="rounded-full bg-sage p-1.5 mt-1 m-0.5"
    />
  ) : (
    <svg
      className={classNames(
        "stroke-1 block rounded-full my-[10%] mx-auto",
        size,
        iconColor,
        { "animate-spin-slow": isLoading }
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34 34"
    >
      <circle
        className={classNames(
          "stroke-1 animate-stroke fill-sage group-hover:fill-green",
          addBGColor
        )}
        cx="17"
        cy="17"
        r="16"
        fill="none"
      />
      <path
        className="origin-[50%_50%] animate-stroke-slow"
        fill="none"
        d="M17 11 v12 M11 17 h12"
      />
    </svg>
  );
}

import React from "react";
import classNames from "classnames";

export default function AnimatedSuccessIcon({
  size,
  iconColor,
  successBGColor,
}) {
  return (
    <svg
      className={classNames(
        "checkmark stroke-2 block rounded-full my-[10%] mx-auto animate-fill-scale",
        size,
        iconColor
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle
        className={classNames(
          "checkmark__circle stroke-2 fill-none animate-stroke",
          successBGColor
        )}
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />{" "}
      <path
        className="checkmark__check origin-[50%_50%] animate-stroke-slow"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  );
}

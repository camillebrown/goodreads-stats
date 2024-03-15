import React from "react";
import classNames from "classnames";
import { DateTime } from "luxon";

import { difference_in_seconds } from "@/lib/time_formatters";

export default function AnimatedSuccessIcon({
  size,
  iconColor,
  createdAt,
  successBGColor,
}) {
  const justCreated = difference_in_seconds(DateTime.fromISO(createdAt)) < 45;

  return (
    <svg
      className={classNames(
        "checkmark stroke-2 block rounded-full my-[10%] mx-auto",
        size,
        iconColor,
        justCreated ? "animate-fill-scale" : "shadow-orange"
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle
        className={classNames(
          "checkmark__circle stroke-2 fill-none",
          successBGColor,
          justCreated ? "animate-stroke" : "check-stroke"
        )}
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />{" "}
      <path
        className={classNames(
          "checkmark__check origin-[50%_50%]",
          justCreated ? "animate-stroke-slow" : "check-stroke"
        )}
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  );
}

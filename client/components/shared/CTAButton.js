import React from "react";
import classNames from "classnames";

export default function CTAButton({ onClick, buttonClass, buttonText }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "inline-flex items-center rounded-md px-8 py-2 text-sm font-semibold text-white shadow-sm",
        buttonClass
      )}
    >
      {buttonText}
    </button>
  );
}

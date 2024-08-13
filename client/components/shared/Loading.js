import React from "react";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export default function Loading({ className, containerClass }) {
  return (
    <div className={`flex justify-center ${containerClass}`} role="loading">
      <FontAwesomeIcon
        icon={faCircleNotch}
        className={classNames(
          "text-4xl text-primary-gray animate-spin",
          className
        )}
      />
    </div>
  );
}

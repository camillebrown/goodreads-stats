import React from "react";
import AnimatedPlusIcon from "./AnimatedPlusIcon";
import AnimatedSuccessIcon from "./AnimatedSuccessIcon";

export default function AnimatedSaveBook({
  addBGColor,
  createdAt,
  iconColor,
  isLoading,
  isUserBook,
  size,
  successBGColor,
}) {
  const props = {
    size,
    iconColor,
    addBGColor,
    isLoading,
    successBGColor,
    createdAt
  };

  return (
    <div className="transition-opacity duration-500">
      {isUserBook ? (
        <AnimatedSuccessIcon {...props} />
      ) : (
        <AnimatedPlusIcon {...props} />
      )}
    </div>
  );
}

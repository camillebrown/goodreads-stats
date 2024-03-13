import React from "react";
import AnimatedPlusIcon from "./AnimatedPlusIcon";
import AnimatedSuccessIcon from "./AnimatedSuccessIcon";

export default function AnimatedSaveBook({
  isUserBook,
  addBGColor,
  size,
  iconColor,
  successBGColor,
  isLoading,
}) {
  const props = {
    size,
    iconColor,
    addBGColor,
    isLoading,
    successBGColor,
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

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
    <div>
      {isUserBook ? (
        <AnimatedSuccessIcon {...props} />
      ) : (
        <AnimatedPlusIcon {...props} />
      )}
    </div>
  );
}

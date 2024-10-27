"use client";

import classNames from "classnames";

export function DisplayBanner({
  bannerContentContainer,
  bannerImageHeight = "h-64",
  bgClass,
  className = "",
  description,
  direction = "vertical",
  fade = [],
  headingClass = "",
  onClick = () => {},
  subHeadingText,
  title,
}) {
  const fadeDivs = () => {
    const gradientPairs = {
      top: "bg-gradient-to-b",
      bottom: "bg-gradient-to-t",
      left: "bg-gradient-to-r",
      right: "bg-gradient-to-l",
    };

    return fade.map((direction) => (
      <div
        key={direction}
        className={classNames(
          "absolute inset-0 from-white to-50%",
          gradientPairs[direction]
        )}
      />
    ));
  };

  return (
    <div
      onClick={onClick}
      className={classNames(
        className,
        "group relative flex overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 cursor-pointer hover:scale-[1.005] hover:shadow-2xl transition",
        direction === "vertical" ? "flex-col" : "flex-col relative"
      )}
    >
      <div
        className={classNames(bannerImageHeight, "relative shrink-0", {
          "w-full": direction === "horizontal",
        })}
      >
        <div
          className={classNames(
            "absolute inset-0 bg-no-repeat bg-cover",
            bgClass
          )}
        />
        {fadeDivs()}
      </div>
      <div
        className={classNames({
          "absolute inset-0 flex": direction === "horizontal",
        })}
      >
        <div
          className={classNames(
            "flex flex-col items-start w-2/5 bg-white",
            bannerContentContainer ? bannerContentContainer : "p-10",
            direction === "horizontal" ? "justify-center" : "justify-end"
          )}
        >
          <h3
            className={classNames(
              headingClass,
              "font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500"
            )}
          >
            {subHeadingText}
          </h3>
          <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950">
            {title}
          </p>
          <div className="mt-2 max-w-[600px] text-sm/6 text-gray-600">
            {description}
          </div>
        </div>
        {direction === "horizontal" && (
          <div className="w-1/3 bg-gradient-to-r from-white to-transparent" />
        )}
      </div>
    </div>
  );
}

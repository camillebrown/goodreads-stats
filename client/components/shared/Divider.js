import React from "react";
import classNames from "classnames";

export default function Divider({ height, color }) {
  return <div className={classNames("w-[0.25px] my-auto hidden md:inline", height, color)} />;
}

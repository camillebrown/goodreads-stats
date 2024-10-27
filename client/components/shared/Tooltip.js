import React from "react";
import { usePopperTooltip } from "react-popper-tooltip";

export default function Tooltip({
  children,
  tooltip_text,
  trigger_class,
  container_class,
  disabled,
  placement,
}) {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ placement: placement || "auto" });

  return (
    <>
      <span ref={setTriggerRef} className={trigger_class}>
        {children}
      </span>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: `border border-dark-gray shadow-md p-2 rounded-md z-10 block ${container_class} ${disabled ? "hidden" : ""}`,
          })}
        >
          {tooltip_text}
        </div>
      )}
    </>
  );
}

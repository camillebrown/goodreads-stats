import { toast } from "react-hot-toast";
import classNames from "classnames";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function useToast() {
  function makeToast(msg, type, toastClass) {
    return toast.custom((t) => (
      <div
        className={classNames(
          "absolute top-3 right-3 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3",
          t.visible ? "toast-in" : "toast-out",
          toastClass
        )}
        style={{ backgroundColor: type === "error" ? "#e22d20" : "#16a34a" }}
        id="static-example"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-mdb-autohide="false"
      >
        <div className="flex justify-between items-center py-2 px-3 bg-clip-padding border-b rounded-lg">
          <div className="flex items-center gap-2">
            {type === "error" ? (
              <ExclamationTriangleIcon className="text-white mr-4 w-5 h-5" />
            ) : (
              <CheckCircleIcon className="text-white mr-4 w-5 h-5" />
            )}
            <p className="font-semibold tracking-wide text-white mt-0.5">
              {msg}
            </p>
          </div>
        </div>
      </div>
    ));
  }

  return makeToast;
}

import React, { useContext } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

import { ApiContext } from "pages/_app";
import Loading from "@components/shared/Loading";
import { useBooks } from "@hooks/useBooks";
import useToast from "@hooks/useToast";
import { updateBook } from "@lib/actions/books";
import { statuses } from "@lib/constants/variables";

export default function ChangeBookStatusModal({
  book,
  modalActive,
  toggleModal,
}) {
  const makeToast = useToast();
  const api = useContext(ApiContext);
  const { isSaving, setIsSaving, refetchBooks, deleteUserBook } = useBooks();

  const updateUserBook = async (status) => {
    setIsSaving(book?.id);
    await updateBook(api, { ...book, status: status })
      .then(() => {
        toggleModal();
        makeToast("Book successfully updated", "success", "px-8");
        refetchBooks();
        setIsSaving(false);
      })
      .catch((err) => {
        console.log(err);
        toggleModal();

        let msg;
        if (err.response.data.message) {
          msg = err.response.data.message;
        } else {
          msg = "An Error Occurred: Unable to update book. Please try again.";
        }
        makeToast(msg, "error", "px-16");
        setIsSaving(false);
      });
  };
  return (
    <Dialog
      open={modalActive}
      onClose={toggleModal}
      className="relative z-50 font-raleway"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto min-h-full flex justify-center">
        <div className="flex justify-center p-4 text-center sm:p-0 min-w-full">
          <DialogPanel
            transition
            className="relative transform overflow-scroll rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 max-h-[50vh] sm:max-h-[40vh]"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={toggleModal}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-baby-blue/80">
                <PencilSquareIcon
                  aria-hidden="true"
                  className="h-6 w-6 pl-0.5 pb-0.5 text-white"
                />
              </div>
              <div className="my-2 text-center sm:my-4 flex flex-col gap-2 px-8">
                <DialogTitle
                  as="h3"
                  className="text-xl font-bold leading-6 text-primary-gray"
                >
                  Change Book Status
                </DialogTitle>
                <div>
                  <p>Select a New Status:</p>
                  <div className="flex flex-col sm:flex-row gap-2 my-6">
                    {isSaving ? (
                      <Loading
                        className="w-7 h-7 !text-dark-blue"
                        containerClass="w-full flex justify-center"
                      />
                    ) : (
                      statuses.map((s) => {
                        return (
                          <span
                            key={s.value}
                            onClick={() =>
                              book?.status === s.value
                                ? null
                                : updateUserBook(s.value)
                            }
                            className={classNames(
                              "inline-flex items-center gap-x-0.5 rounded-md px-2 py-1 text-xs font-medium cursor-pointer sm:w-1/3 justify-center border",
                              s.statusClass,
                              {
                                "!bg-gray-100 !text-tertiary-gray !border-tertiary-gray !cursor-not-allowed":
                                  book?.status === s.value,
                              }
                            )}
                          >
                            {s.title}
                          </span>
                        );
                      })
                    )}
                  </div>
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="w-full border-t border-tertiary-gray/40" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-2 text-sm text-secondary-gray/40">
                        OR
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5 tracking-wide my-4">
                    <p className="font-thin text-secondary-gray text-sm">
                      I would like to remove{" "}
                      <span className="font-medium">{book?.title}</span> from my
                      saved books
                    </p>
                    <p
                      className={classNames(
                        "text-baby-blue cursor-pointer hover:text-dark-blue border-b border-transparent hover:border-baby-blue max-w-max mx-auto",
                        {
                          "text-tertiary-gray cursor-not-allowed": isSaving,
                        }
                      )}
                      onClick={() => {
                        deleteUserBook(book);
                        toggleModal();
                      }}
                    >
                      Remove from your books
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

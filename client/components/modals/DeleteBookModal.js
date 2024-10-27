import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { useBooks } from "@hooks/useBooks";

export default function DeleteBookModal({ book, modalActive, toggleModal }) {
  const { deleteUserBook } = useBooks();

  return (
    <Dialog open={modalActive} onClose={toggleModal} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-error-red/90">
                <ExclamationTriangleIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-white"
                />
              </div>
              <div className="my-4 text-center sm:my-6 flex flex-col gap-2 px-8">
                <DialogTitle
                  as="h3"
                  className="text-xl font-bold leading-6 text-primary-gray"
                >
                  Delete This Book?
                </DialogTitle>
                <div className="text-primary">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Are you sure you'd like to delete the following book from your
                  saved books:
                  <p className="font-semibold mt-4 text-xl text-baby-blue">
                    {book?.volumeInfo?.title || book?.book_title}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  deleteUserBook(book);
                  toggleModal();
                }}
                className="inline-flex w-full justify-center rounded-md bg-salmon px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rich-salmon sm:col-start-2"
              >
                Yes, delete
              </button>
              <button
                type="button"
                data-autofocus
                onClick={toggleModal}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-salmon shadow-sm ring-1 ring-salmon hover:bg-salmon hover:text-white sm:col-start-1 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

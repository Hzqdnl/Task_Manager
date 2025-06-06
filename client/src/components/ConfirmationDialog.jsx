import { DialogTitle } from "@headlessui/react";
import clsx from "clsx";
import { FaTrashRestore } from "react-icons/fa";
import Button from "./Button";
import ModalWrapper from "./ModalWrapper";
import { CiWarning } from "react-icons/ci";



export default function ConfirmationDialog({
  open,
  setOpen,
  msg,
  onClick = () => {},
  type = "delete",
  setMsg = () => {},
  setType = () => {},
}) {
  const closeDialog = () => {
    setOpen(false);

    setTimeout(() => {setType("delete");
    setMsg(null);
  }, 300);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
          <DialogTitle as='h3' className=''>
            <p
              className={clsx(
                "p-3 rounded-full ",
                type === "restore" || type === "restoreAll"
                  ? "text-green-600 bg-green-100"
                  : "text-red-600 bg-red-100"
              )}
            >
              <CiWarning size={60} />
            </p>
          </DialogTitle>

          <p className='text-center text-gray-500'>
            {msg ?? "Delete the selected RECORD?"}
          </p>

          <div className='py-3 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              type='button'
              className={clsx(
                " px-8 text-sm font-semibold text-white sm:w-auto",
                type === "restore" || type === "restoreAll"
                  ? "bg-green-500 hover:bg-green-400"
                  : "bg-red-600 hover:bg-red-500"
              )}
              onClick={onClick}
              label={type === "restore" ? "Restore" : "Delete"}
            />

            <Button
              type='button'
              className='bg-white px-8 text-sm font-semibold hover:text-gray-500 text-gray-900 sm:w-auto border'
              onClick={() => closeDialog()}
              label='Cancel'
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
          <DialogTitle as='h3' className=''>
            <p className={clsx("p-3 rounded-full ", "text-red-600 bg-red-100")}>
              <CiWarning size={60} />
            </p>
          </DialogTitle>

          <p className='text-center text-gray-500'>
            {"Are you sure you want to activate or deactive this account?"}
          </p>

          <div className='bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              type='button'
              className={clsx(
                " px-8 text-sm font-semibold text-white sm:w-auto",
                "bg-red-600 hover:bg-red-500"
              )}
              onClick={onClick}
              label={"Yes"}
            />

            <Button
              type='button'
              className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border'
              onClick={() => closeDialog()}
              label='No'
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
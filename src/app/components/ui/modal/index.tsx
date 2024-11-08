import { ReactNode } from "react";
import Button from "../button";
import CloseIcon from "../../icons/CloseIcon";

type TModal = {
  title?: string;
  open: boolean;
  children: ReactNode;
  onChange: (open: boolean) => void;
};
const Modal = ({ open, children, onChange, title }: TModal) => {
  return (
    open && (
      <>
        <div
          className="fixed left-0 top-0 w-screen h-screen bg-black opacity-25 z-10"
          onClick={() => onChange(false)}
        ></div>
        <div className="px-4 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-full">
          <div className=" w-full max-w-md mx-auto rounded-2xl bg-white border border-u-border-s p-5">
            <div className="flex justify-between items-center gap-2 mb-2">
              <h5 className="text-u-text-p-900 font-medium text-lg">{title}</h5>
              <Button
                variant="text_tertiary"
                size="icon"
                onClick={() => onChange(false)}
              >
                <CloseIcon className="size-5" />
              </Button>
            </div>
            {children}
          </div>
        </div>
      </>
    )
  );
};

export default Modal;

import React from "react";
import CheckIcon from "../../icons/CheckIcon";

type TCheckbox = {
  checked: boolean;
  onClick: (checked: boolean) => void;
};
const Checkbox = ({ checked, onClick }: TCheckbox) => {
  return (
    <div
      onClick={() => onClick(!checked)}
      className={`size-5 flex justify-center items-center border-2 rounded cursor-pointer ${
        checked
          ? "border-u-purple-700 bg-u-purple-700"
          : "border-u-border-s bg-white"
      }`}
    >
      {checked && <CheckIcon className="size-4 text-white" />}
    </div>
  );
};

export default Checkbox;

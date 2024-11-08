import { useEffect, useState } from "react";

type TAvatar = {
  fullName: string;
};

const Avatar = ({ fullName }: TAvatar) => {
  const [abbv, setAbbv] = useState("");

  useEffect(() => {
    const nameList = fullName.split(" ");
    if (nameList.length) {
      const firstLetter = nameList[0].toUpperCase().charAt(0);
      const lastLetter = nameList[nameList.length - 1].toUpperCase().charAt(0);
      setAbbv(`${firstLetter}${lastLetter}`);
    }
  }, [fullName]);

  return (
    <div className="flex justify-center items-center bg-u-neutral-100 text-u-neutral-400 size-10 rounded-full text-xs font-medium">
      {abbv}
    </div>
  );
};

export default Avatar;

import { NavLink } from "react-router-dom";
import { TNavigationItem } from "../types/constant/type";

const SidebarItem = ({ title, path, icon }: TNavigationItem) => {
  return (
    <NavLink
      to={`/dashboard/${path}`}
      className={({ isActive }) =>
        (isActive
          ? "text-u-neutral-900 bg-white rounded-xl border-u-neutral-200 shadow-sm"
          : "text-u-neutral-700 border-transparent") +
        " py-2 px-3 flex justify-start items-center gap-3 text-base border font-medium w-full"
      }
    >
      {({ isActive }) => (
        <>
          {icon(isActive ? { className: "[&_path]:fill-u-neutral-800" } : {})}
          {title}
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;

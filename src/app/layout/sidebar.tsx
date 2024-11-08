import { useEffect } from "react";
import Logo from "../../assets/svg/Logo.svg";
import { navigations } from "../constants/navigations";
import useWindowSize from "../hooks/useWindowSize";
import SidebarItem from "./sidebarItem";

type TSidebar = {
  open: boolean;
  onClose: () => void;
};

const Sidebar = ({ open, onClose }: TSidebar) => {
  const [width] = useWindowSize();

  useEffect(() => {
    if (width && width >= 1100) onClose();
  }, [width]);

  return (
    <>
      {open && (
        <div
          className="fixed left-0 top-0 w-screen h-screen bg-black opacity-25 z-10 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      <aside
        className={`fixed left-0 top-0 lg:relative max-w-[300px] w-full z-20  lg:translate-x-0 transition-all duration-300 ease-in lg:transition-none
    ${open ? "translate-x-0" : "-translate-x-full"}
    `}
      >
        <div className="flex flex-col justify-start items-start h-screen lg:h-auto bg-u-neutral-50 p-4 lg:p-0">
          {/* Logo section */}
          <div className="pt-6 pb-8 px-2 w-full">
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-[110px] object-contain"
            />
          </div>
          {/* nav */}
          <nav className="flex flex-col justify-start items-start py-6 gap-3 w-full">
            {navigations.map((navItem, index) => (
              <SidebarItem key={index} {...navItem} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

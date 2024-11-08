import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Button from "../components/ui/button";
import MagicIcon from "../components/icons/MagicIcon";
import NotificationsIcon from "../components/icons/NotificationsIcon";
import HelpIcon from "../components/icons/HelpIcon";
import Avatar from "../components/ui/avatar";
import HamburgerMenuIcon from "../components/icons/HamburgerMenuIcon";
import { useState } from "react";
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="md:p-4 bg-u-neutral-50 w-screen max-w-[100vw] h-screen max-h-screen grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="border border-u-border-s md:rounded-3xl bg-white max-h-screen lg:max-h-[calc(100vh_-_32px)]">
        <div className="border-b border-u-border-s px-5 py-3.5 lg:px-8 lg:py-5.5 flex justify-between lg:justify-end items-center gap-2 [&+*]:h-[calc(100%_-_72px)] [&+*]:lg:h-[calc(100%_-_88px)]">
          <Button
            variant="text_tertiary"
            size="lg"
            className="!p-2 lg:hidden flex"
            onClick={() => setSidebarOpen(true)}
          >
            <HamburgerMenuIcon />
          </Button>
          <div className="flex justify-end items-center gap-6">
            <Button
              variant="text_tertiary"
              size="lg"
              className="px-4.5 lg:flex hidden"
            >
              <MagicIcon />
              Explore
            </Button>
            <div className="flex justify-center items-center gap-1">
              <Button variant="text_tertiary" size="icon">
                <HelpIcon />
              </Button>
              <Button variant="text_tertiary" size="icon">
                <NotificationsIcon />
              </Button>
            </div>
            <Avatar fullName="Reza Farhang" />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

import ExtensionIcon from "../components/icons/ExtensionIcon";
import IntegrationIcon from "../components/icons/IntegrationIcon";
import SubscribtionIcon from "../components/icons/SubscribtionIcon";
import WatchListIcon from "../components/icons/WatchListIcon";
import { TNavigations } from "../types/constant/type";
import { TSVGProps } from "../types/icons/type";

export const navigations: TNavigations = [
  {
    title: "Watchlist",
    path: "watch-list",
    icon: (svgProps?: TSVGProps) => <WatchListIcon {...svgProps} />,
  },
  {
    title: "#2",
    path: "nav-2",
    icon: (svgProps?: TSVGProps) => <ExtensionIcon {...svgProps} />,
  },
  {
    title: "#3",
    path: "nav-3",
    icon: (svgProps?: TSVGProps) => <IntegrationIcon {...svgProps} />,
  },
  {
    title: "#4",
    path: "nav-4",
    icon: (svgProps?: TSVGProps) => <SubscribtionIcon {...svgProps} />,
  },
];

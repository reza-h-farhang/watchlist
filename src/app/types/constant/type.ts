import { TSVGProps } from "../icons/type";

export type TNavigations = TNavigationItem[];
export type TNavigationItem = {
  title: string;
  path: string;
  icon: (props?: TSVGProps) => JSX.Element;
};

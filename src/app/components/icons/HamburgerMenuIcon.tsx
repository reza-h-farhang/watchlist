import { TSVGProps } from "../../types/icons/type";

const HamburgerMenuIcon: React.FC<TSVGProps> = (svgProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M4 18H20M4 12H20M4 6H20"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default HamburgerMenuIcon;

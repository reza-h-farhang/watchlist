import { TSVGProps } from "../../types/icons/type";

const PlusIcon: React.FC<TSVGProps> = (svgProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M10.0001 4.16666V15.8333M4.16675 9.99999H15.8334"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;

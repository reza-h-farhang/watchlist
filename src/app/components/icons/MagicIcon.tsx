import { TSVGProps } from "../../types/icons/type";

const MagicIcon: React.FC<TSVGProps> = (svgProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <mask
        id="mask0_382_550"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_382_550)">
        <path
          d="M8.33342 15.8333L6.25008 11.25L1.66675 9.16667L6.25008 7.08333L8.33342 2.5L10.4167 7.08333L15.0001 9.16667L10.4167 11.25L8.33342 15.8333ZM15.0001 17.5L13.9584 15.2083L11.6667 14.1667L13.9584 13.125L15.0001 10.8333L16.0417 13.125L18.3334 14.1667L16.0417 15.2083L15.0001 17.5Z"
          fill="#475467"
        />
      </g>
    </svg>
  );
};

export default MagicIcon;

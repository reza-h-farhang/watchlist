import { TSVGProps } from "../../types/icons/type";

const CheckIcon: React.FC<TSVGProps> = (svgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="50px"
      height="50px"
      {...svgProps}
    >
      <path
        fill="currentColor"
        d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z"
      />
    </svg>
  );
};

export default CheckIcon;

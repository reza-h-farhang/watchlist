import { ReactElement, ReactNode } from "react";

type TButton = {
  children: ReactElement | ReactNode | JSX.Element | string;
  variant: "filled_primary" | "text_tertiary";
  size: "lg" | "icon";
  className?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  variant = "filled_primary",
  size = "lg",
  className,
  onClick,
}: TButton) => {
  const variants = {
    filled_primary:
      "bg-u-purple-400 text-white [&_*]:fill-white hover:bg-u-purple-700 shadow-shadow-skm-in",
    text_tertiary:
      "text-u-neutral-600 [&_*]:fill-u-neutral-600 bg-white hover:bg-u-neutral-50",
  };

  const sizes = {
    lg: "py-2.5 px-4 rounded-lg text-base font-semibold",
    icon: "p-3 rounded-lg text-base font-semibold",
  };

  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-2 transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

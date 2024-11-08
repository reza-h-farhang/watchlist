type TInput = {
  name: string;
  type: "text" | "email" | "password";
  placeholder: string;
  preIcon?: JSX.Element;
  wrapperClassName?: string;
  value: string;
  onChange: (_value: string) => void;
};

const Input = ({
  name,
  type = "text",
  placeholder,
  preIcon,
  wrapperClassName,
  value,
  onChange,
}: TInput) => {
  return (
    <div
      className={`flex justify-start items-center gap-2 bg-white rounded-lg border border-u-border-p overflow-hidden h-11 px-3.5 ${wrapperClassName}`}
    >
      {preIcon && preIcon}
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-base placeholder:text-u-text-ph text-u-text-ph"
      />
    </div>
  );
};

export default Input;

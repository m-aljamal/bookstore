import React from "react";
import clsx from "clsx";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  color?: "blue" | "gray";
  className?: string;
  variant?: "solid" | "outline";
}

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-md py-2 px-4 text-sm focus:outline-none",
};

const variantStyles = {
  solid: {
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    gray: "bg-gray-500 hover:bg-gray-600 text-white",
  },
  outline: {
    blue: "bg-white hover:bg-blue-50 text-blue-500",
    gray: "bg-white hover:bg-gray-50 text-gray-500",
  },
};

const Button: React.FC<ButtonProps> = ({
  color = "blue",
  variant = "solid",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        baseStyles[variant],
        variantStyles[variant][color],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

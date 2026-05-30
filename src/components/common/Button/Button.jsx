import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secom-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-black text-white hover:bg-gray-800 active:scale-[0.98]",

        secondary:
          "border border-secom-500 bg-white text-secom-600 hover:bg-secom-50",

        outline:
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",

        ghost: "text-secom-600 hover:bg-secom-50",

        danger: "bg-red-600 text-white hover:bg-red-700",

        success: "bg-emerald-600 text-white hover:bg-emerald-700",
      },

      size: {
        sm: "h-9 px-4 text-sm",

        md: "h-11 px-5 text-sm",

        lg: "h-12 px-6 text-base",

        icon: "h-11 w-11",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export default function Button({
  children,
  className,
  variant,
  size,
  fullWidth,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

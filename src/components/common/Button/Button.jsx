import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-sky-600 text-white hover:bg-sky-700 active:scale-[0.98]",

        secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",

        outline: "border border-slate-300 bg-white hover:bg-slate-100",

        ghost: "hover:bg-slate-100 text-slate-700",

        danger: "bg-red-500 text-white hover:bg-red-600",

        success: "bg-emerald-500 text-white hover:bg-emerald-600",
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

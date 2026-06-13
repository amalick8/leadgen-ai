import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

const variants = {
  primary: "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-950/20",
  secondary: "border border-slate-200 bg-white text-slate-950 shadow-sm hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-lg hover:shadow-indigo-950/10",
  ghost: "text-slate-700 hover:-translate-y-0.5 hover:bg-slate-100",
  danger: "bg-rose-600 text-white shadow-lg shadow-rose-600/15 hover:-translate-y-1 hover:bg-rose-700 hover:shadow-xl hover:shadow-rose-700/20",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({ href, variant = "primary", size = "md", className, children, ...props }: Props) {
  const classes = cn(
    "inline-flex transform-gpu items-center justify-center gap-2 rounded-lg font-semibold outline-none transition-all duration-300 ease-out focus-visible:ring-4 focus-visible:ring-indigo-100 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:translate-y-0 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
  if (href) return <Link className={classes} href={href}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}

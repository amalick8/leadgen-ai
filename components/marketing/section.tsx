import { cn } from "@/lib/utils/cn";

export function SectionWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", className)}>{children}</section>;
}

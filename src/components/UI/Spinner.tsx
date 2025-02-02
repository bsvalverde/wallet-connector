import { cn } from "@/utils/cn";
import { LoaderCircle, LucideProps } from "lucide-react";

export function Spinner({ className, ...props }: Omit<LucideProps, "ref">) {
  return <LoaderCircle className={cn(className, "animate-spin")} {...props} />;
}

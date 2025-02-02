import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { LoaderCircle, LucideProps } from "lucide-react";

const spinnerVariants = cva("animate-spin", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "",
      secondary: "text-primary",
      ghost: "",
      link: "text-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props
  extends Omit<LucideProps, "ref">,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({ className, variant, ...props }: Props) {
  return (
    <LoaderCircle
      className={cn(spinnerVariants({ variant, className }))}
      {...props}
    />
  );
}

import { cn } from "@/utils/cn";
import { Button, ButtonProps } from "./Button";
import { Spinner } from "./Spinner";

interface Props extends ButtonProps {
  loading: boolean;
}

export function LoadingButton({
  children,
  className,
  disabled,
  loading,
  variant,
  ...props
}: Props) {
  return (
    <Button
      {...props}
      className={cn(className, "relative", loading && "text-transparent")}
      disabled={disabled || loading}
      variant={variant}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center p-1">
          <Spinner variant={variant} className="size-4" />
        </div>
      )}
      {children}
    </Button>
  );
}

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
  ...props
}: Props) {
  return (
    <Button
      {...props}
      className={cn(className, "relative")}
      disabled={disabled || loading}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center p-1">
          <Spinner className="size-4" />
        </div>
      )}
      <div className={cn(loading && "text-transparent")}>{children}</div>
    </Button>
  );
}

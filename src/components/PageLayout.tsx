import React from "react";

export default function PageLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen items-center justify-center p-2">
      {children}
    </div>
  );
}

"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

type SonnerProps = React.ComponentPropsWithoutRef<typeof SonnerToaster>;

function Toaster({ ...props }: SonnerProps) {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as SonnerProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };

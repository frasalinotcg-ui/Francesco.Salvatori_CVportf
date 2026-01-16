"use client";

import * as React from "react";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

// Define minimal types for input-otp to avoid circular imports
type OTPInputProps = React.ComponentPropsWithoutRef<'div'> & {
  containerClassName?: string;
  maxLength?: number;
  render?: (props: { slots: Array<{ char: string | null; isActive: boolean; hasFakeCaret: boolean }> }) => React.ReactNode;
};

// Stub implementation - replace with actual input-otp when available
function InputOTP({
  className,
  containerClassName,
  maxLength = 6,
  ...props
}: OTPInputProps) {
  return (
    <div
      data-slot="input-otp"
      className={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      {...props}
    >
      <div className={cn("disabled:cursor-not-allowed", className)}>
        {/* OTP Input implementation would go here */}
      </div>
    </div>
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  // Simplified implementation without context
  const char = '';
  const hasFakeCaret = false;
  const isActive = false;

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

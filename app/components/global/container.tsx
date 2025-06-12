import { cn } from "@/app/lib/utils";
import React, { forwardRef } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ children, className }, ref) => {
    return (
      <section ref={ref} className={cn("px-5 md:px-16", className)}>
        {children}
      </section>
    );
  }
);

Container.displayName = "Container";

export default Container;

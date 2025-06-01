import { cn } from "@/app/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <section className={cn("px-5 md:px-16", className)}>{children}</section>
  );
};

export default Container;

"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";
// import { ActiveThemeProvider } from "../../global/active-theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  // we need the resolvedTheme value to set the baseTheme for clerk based on the dark or light theme
  const { resolvedTheme } = useTheme();

  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }}
      >
        {children}
      </ClerkProvider>
    </>
  );
}

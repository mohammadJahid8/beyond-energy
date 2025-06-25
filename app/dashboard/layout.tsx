import { SidebarInset, SidebarProvider } from "@/app/components/ui/sidebar";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import AppSidebar from "../components/ui/layout/app-sidebar";
import Header from "../components/ui/layout/header";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Admin - Beyond Energy",
  description: "Beyond Energy Admin Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata.role;
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar role={role!} />
      <SidebarInset>
        <Header />
        {/* page main content */}
        {children}
        {/* page main content ends */}
      </SidebarInset>
    </SidebarProvider>
  );
}

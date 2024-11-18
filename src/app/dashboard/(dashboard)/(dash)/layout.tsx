import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DynamicSidebar from "./SideBar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stores Dz - Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <DynamicSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center">
              <SidebarTrigger>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </SidebarTrigger>
            </div>
            <div>{/* Add user menu or other header content here */}</div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

import React from "react";
import { AppTopbar } from "@/components/app/AppTopbar";
import { AppSidebar } from "@/components/app/AppSidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-950 text-slate-100">
      <AppTopbar />
      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-slate-950/50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

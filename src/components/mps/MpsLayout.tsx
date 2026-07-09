import type { ReactNode } from "react";
import { MpsHeader } from "@/components/mps/MpsHeader";
import { MpsSidebar } from "@/components/mps/MpsSidebar";

export function MpsLayout({
  breadcrumbs,
  children,
}: {
  breadcrumbs: string[];
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f6fa] text-[14px] leading-[22px]">
      <MpsSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MpsHeader breadcrumbs={breadcrumbs} />
        <main className="flex min-h-0 flex-1 flex-col p-4">{children}</main>
      </div>
    </div>
  );
}

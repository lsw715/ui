import type { ReactNode } from "react";
import { OpsHeader } from "@/components/ops/OpsHeader";
import { OpsSidebar } from "@/components/ops/OpsSidebar";

interface OpsLayoutProps {
  breadcrumbs: string[];
  children: ReactNode;
}

export function OpsLayout({ breadcrumbs, children }: OpsLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-ops-content-bg)] text-[14px] leading-[22.4px]">
      <OpsSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <OpsHeader breadcrumbs={breadcrumbs} />
        <main className="flex min-h-0 flex-1 flex-col p-4">{children}</main>
      </div>
    </div>
  );
}

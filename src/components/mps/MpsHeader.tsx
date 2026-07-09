"use client";

import { Bell, ChevronRight, Globe } from "lucide-react";

export function MpsHeader({ breadcrumbs }: { breadcrumbs: string[] }) {
  return (
    <header className="flex h-[56px] shrink-0 items-center justify-between border-b border-[#e8e8ef] bg-white px-5">
      <div className="flex items-center gap-1.5 text-[14px] text-[#666]">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1.5">
            {i > 0 ? <ChevronRight className="size-3.5 text-[#ccc]" /> : null}
            <span className={i === breadcrumbs.length - 1 ? "font-medium text-[#333]" : undefined}>
              {crumb}
            </span>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 text-[#666]">
        <div className="rounded-[4px] border border-[#e8e8ef] px-3 py-1 text-[13px] text-[#333]">
          Global Tech Trading Ltd
        </div>
        <button type="button" className="flex items-center gap-1 text-[13px] hover:text-[var(--primary)]">
          <Globe className="size-4" />
          中文
        </button>
        <button type="button" className="hover:text-[var(--primary)]">
          <Bell className="size-4" />
        </button>
      </div>
    </header>
  );
}

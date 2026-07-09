"use client";

import { Bell, ChevronRight, Globe, User } from "lucide-react";

interface OpsHeaderProps {
  breadcrumbs: string[];
}

export function OpsHeader({ breadcrumbs }: OpsHeaderProps) {
  return (
    <header className="flex h-[56px] shrink-0 items-center justify-between border-b border-[var(--color-ops-border)] bg-[var(--color-ops-header-bg)] px-5">
      <div className="flex items-center gap-1.5 text-[14px] text-[#666]">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb} className="flex items-center gap-1.5">
            {index > 0 ? <ChevronRight className="size-3.5 text-[#bbb]" /> : null}
            <span
              className={
                index === breadcrumbs.length - 1 ? "font-medium text-[#333]" : undefined
              }
            >
              {crumb}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-[#666]">
        <button type="button" className="flex items-center gap-1 text-[13px] hover:text-[var(--primary)]">
          <Globe className="size-4" />
          <span>中文</span>
        </button>
        <button type="button" className="hover:text-[var(--primary)]">
          <Bell className="size-4" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-[var(--color-ops-border)] px-3 py-1 text-[13px] hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <User className="size-4" />
          <span>Admin</span>
        </button>
      </div>
    </header>
  );
}

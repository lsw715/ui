import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DescriptionGrid({
  items,
  columns = 3,
}: {
  items: Array<{ label: string; value: ReactNode; span?: number; display?: boolean }>;
  columns?: 2 | 3 | 4;
}) {
  const visible = items.filter((item) => item.display !== false);
  const colClass =
    columns === 4
      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
      : columns === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  return (
    <dl className={cn("grid gap-x-8 gap-y-3", colClass)}>
      {visible.map((item) => (
        <div
          key={item.label}
          className={cn(item.span === 4 && "md:col-span-2 xl:col-span-4")}
        >
          <dt className="mb-1 text-[13px] text-[#999]">{item.label}</dt>
          <dd className="text-[14px] text-[#333] break-all">{item.value ?? "-"}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-[15px] font-medium text-[#333]">{title}</h3>
      {children}
    </section>
  );
}

export function StatusBadge({
  label,
  colorClass,
}: {
  label: string;
  colorClass: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded border px-2 py-0.5 text-[12px] font-medium",
        colorClass,
      )}
    >
      {label}
    </span>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  Home,
  Receipt,
  Settings,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { label: "首页", href: "/home", icon: Home },
  {
    label: "订单",
    icon: CreditCard,
    children: [
      { label: "交易订单", href: "/order/transaction-list" },
      { label: "退款订单", href: "/order/refund-list" },
    ],
  },
  { label: "结算", href: "/settlement", icon: Wallet },
  { label: "争议", href: "/order/dispute", icon: Receipt },
  { label: "设置", href: "/settings", icon: Settings },
];

function isActive(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MpsSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 订单: true });

  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col border-r border-[#e8e8ef] bg-white">
      <div className="flex h-[56px] items-center border-b border-[#e8e8ef] px-5">
        <span className="text-[18px] font-semibold text-[var(--primary)]">PayKKa</span>
        <span className="ml-1.5 text-[12px] text-[#999]">商户端</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = Boolean(item.children?.length);
          const isOpen = expanded[item.label];
          const childActive = item.children?.some((c) => isActive(pathname, c.href));

          if (hasChildren) {
            return (
              <div key={item.label} className="mb-0.5">
                <button
                  type="button"
                  onClick={() => setExpanded((p) => ({ ...p, [item.label]: !p[item.label] }))}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-5 py-2.5 text-[13px] transition-colors",
                    childActive ? "text-[var(--primary)]" : "text-[#666] hover:text-[var(--primary)]",
                  )}
                >
                  {Icon ? <Icon className="size-4" /> : null}
                  <span className="flex-1 text-left">{item.label}</span>
                  {isOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
                </button>
                {isOpen ? (
                  <div className="mt-0.5 space-y-0.5">
                    {item.children?.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href ?? "#"}
                        className={cn(
                          "block py-2 pl-11 pr-5 text-[13px] transition-colors",
                          isActive(pathname, child.href)
                            ? "bg-[#f0f0fc] font-medium text-[var(--primary)]"
                            : "text-[#666] hover:bg-[#fafafa] hover:text-[var(--primary)]",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href ?? "#"}
              className={cn(
                "mb-0.5 flex items-center gap-2.5 px-5 py-2.5 text-[13px] transition-colors",
                isActive(pathname, item.href)
                  ? "bg-[#f0f0fc] font-medium text-[var(--primary)]"
                  : "text-[#666] hover:bg-[#fafafa] hover:text-[var(--primary)]",
              )}
            >
              {Icon ? <Icon className="size-4" /> : null}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

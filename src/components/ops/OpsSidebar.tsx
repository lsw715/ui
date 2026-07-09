"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  LayoutDashboard,
  Receipt,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
  icon?: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  { label: "工作台", href: "/", icon: LayoutDashboard },
  {
    label: "网关订单",
    icon: CreditCard,
    children: [
      { label: "网关支付订单", href: "/gateway-order-payment-list" },
      { label: "网关退款订单", href: "/gateway-order-refund-list" },
      { label: "退款审核", href: "/refund-review" },
      { label: "代付退款列表", href: "/payout-refund-list" },
      { label: "交易日志", href: "/log-list" },
    ],
  },
  {
    label: "渠道订单",
    icon: Receipt,
    children: [
      { label: "渠道支付订单", href: "/channel-order-payment-list" },
      { label: "渠道退款订单", href: "/channel-order-refund-list" },
    ],
  },
  { label: "商户管理", href: "/merchant-list", icon: Users },
  { label: "清结算", href: "/settlement-list", icon: FileText },
  { label: "系统设置", href: "/settings", icon: Settings },
];

function isActive(pathname: string, href?: string) {
  if (!href || href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function OpsSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    网关订单: true,
  });

  return (
    <aside className="flex h-full w-[208px] shrink-0 flex-col bg-[var(--color-ops-sidebar)] text-[13px]">
      <div className="flex h-[56px] items-center gap-2 border-b border-white/10 px-4">
        <Image
          src="/images/ops-card-dev.eu.paykka.com/logo.png"
          alt="PayKKa"
          width={120}
          height={32}
          className="h-8 w-auto brightness-0 invert"
          priority
        />
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = Boolean(item.children?.length);
          const isOpen = expanded[item.label];
          const childActive = item.children?.some((child) => isActive(pathname, child.href));

          if (hasChildren) {
            return (
              <div key={item.label} className="mb-1">
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [item.label]: !prev[item.label] }))
                  }
                  className={cn(
                    "flex w-full items-center gap-2 px-4 py-2.5 transition-colors",
                    childActive
                      ? "text-white"
                      : "text-[var(--color-ops-sidebar-text)] hover:text-white",
                  )}
                >
                  {Icon ? <Icon className="size-4 shrink-0" /> : null}
                  <span className="flex-1 text-left">{item.label}</span>
                  {isOpen ? (
                    <ChevronDown className="size-3.5 opacity-60" />
                  ) : (
                    <ChevronRight className="size-3.5 opacity-60" />
                  )}
                </button>
                {isOpen ? (
                  <div className="mt-0.5 space-y-0.5">
                    {item.children?.map((child) => {
                      const active = isActive(pathname, child.href);
                      return (
                        <Link
                          key={child.label}
                          href={child.href ?? "#"}
                          className={cn(
                            "block py-2 pl-10 pr-4 transition-colors",
                            active
                              ? "bg-[var(--color-ops-sidebar-hover)] text-[var(--color-ops-sidebar-active)]"
                              : "text-[var(--color-ops-sidebar-text)] hover:bg-[var(--color-ops-sidebar-hover)] hover:text-white",
                          )}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
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
                "mb-1 flex items-center gap-2 px-4 py-2.5 transition-colors",
                isActive(pathname, item.href)
                  ? "bg-[var(--color-ops-sidebar-hover)] text-[var(--color-ops-sidebar-active)]"
                  : "text-[var(--color-ops-sidebar-text)] hover:bg-[var(--color-ops-sidebar-hover)] hover:text-white",
              )}
            >
              {Icon ? <Icon className="size-4 shrink-0" /> : null}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

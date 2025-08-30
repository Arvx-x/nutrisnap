"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  href: string;
  label: string;
  icon: string;
};

const tabs: Tab[] = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/top-meals", label: "Top Meals", icon: "🍽️" },
  { href: "/insights", label: "Insights", icon: "💡" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-2 left-2 right-2 z-50 rounded-2xl bg-white accent-comic-dual">
      <ul className="mx-auto max-w-md grid grid-cols-4 gap-1 p-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  "flex flex-col items-center justify-center rounded-2xl py-2 text-xs transition " +
                  (isActive
                    ? "bg-[var(--sage)] text-[#1f3b2f] border-2 border-black shadow-[3px_3px_0_0_#111]"
                    : "text-black/70 hover:bg-black/5 border border-transparent")
                }
              >
                <span className="text-base leading-none">{tab.icon}</span>
                <span className="mt-1">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}



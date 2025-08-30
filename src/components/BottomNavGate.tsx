"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function BottomNavGate() {
  const pathname = usePathname();
  // Hide on meal detail pages like /meals/[id]
  const hide = pathname.startsWith("/meals/") && pathname !== "/meals";
  if (hide) return null;
  return <BottomNav />;
}



import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  return (
    <main className="px-5 pt-6 pb-8 max-w-md mx-auto">
      <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
      <p className="mt-3 text-sm">Your dashboard content goes here.</p>
    </main>
  );
}



"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { insights, weeklyProgress } from "@/data/insights";
import { motion } from "framer-motion";

export const dynamic = "force-static";

export default function InsightsPage() {
  return (
    <main className="px-5 pt-6 pb-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold">Insights</h1>
      <p className="mt-1 text-sm text-black/70">
        Your weekly nutrition highlights
      </p>

      <div className="mt-5 grid gap-4">
        {insights.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card>
              <CardContent className="flex items-center gap-3">
                <span className="text-xl">✨</span>
                <p className="text-sm text-black/80">{item.text}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Weekly Goal Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-3 w-full rounded-full bg-black/10 overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--sage)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${weeklyProgress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="mt-2 text-xs text-black/60">
                {weeklyProgress}% complete
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}

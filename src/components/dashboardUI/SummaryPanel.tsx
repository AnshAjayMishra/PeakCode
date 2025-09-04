// components/SummaryPanel.tsx
import { Card, CardContent } from "@/components/ui/card";

export function SummaryPanel({ total, solved }: { total: number; solved: number }) {
  const percentage = Math.round((solved / total) * 100);
  return (
    <Card className="mb-6">
      <CardContent className="flex flex-col md:flex-row justify-between gap-4 p-4">
        <div>Total Questions: {total}</div>
        <div>Solved: {solved}</div>
        <div>Remaining: {total - solved}</div>
        <div>{percentage}% Completed</div>
      </CardContent>
    </Card>
  );
}

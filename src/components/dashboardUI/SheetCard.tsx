import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export function SheetCard({ sheet }: any) {
  const progress = (sheet.solved / sheet.total) * 100;
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-semibold mb-2">{sheet.name}</h4>
        <Progress value={progress} />
        <p className="text-sm mt-2">{sheet.solved} / {sheet.total} solved</p>
      </CardContent>
    </Card>
  );
}

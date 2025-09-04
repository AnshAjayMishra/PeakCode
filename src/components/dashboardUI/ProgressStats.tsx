import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

type Stat = {
  solved: number;
  total: number;
};

type ProgressStatsProps = {
  easy: Stat;
  medium: Stat;
  hard: Stat;
};

export function ProgressStats({ easy, medium, hard }: ProgressStatsProps) {
  const renderStat = (
    label: string,
    solved: number,
    total: number,
    color: string
  ) => (
    <div>
      <h3 className="text-sm font-medium">{label}</h3>
      <Progress value={(solved / total) * 100} className={`bg-${color}-500`} />
      <p className="text-xs mt-1">
        {solved} / {total}
      </p>
    </div>
  );

  return (
    <Card className="mb-6">
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {renderStat("Easy", easy.solved, easy.total, "green")}
        {renderStat("Medium", medium.solved, medium.total, "yellow")}
        {renderStat("Hard", hard.solved, hard.total, "red")}
      </CardContent>
    </Card>
  );
}

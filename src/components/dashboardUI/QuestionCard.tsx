import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export function QuestionCard({ question, onToggle }: any) {
  return (
    <Card>
      <CardContent className="flex justify-between items-center p-4">
        <div>
          <h4 className="font-semibold">{question.title}</h4>
          <p className={`text-sm ${getColor(question.difficulty)}`}>{question.difficulty}</p>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={question.completed} onCheckedChange={() => onToggle(question.id)} />
          {question.completed && <CheckCircle className="text-green-500 w-5 h-5" />}
        </div>
      </CardContent>
    </Card>
  );
}

function getColor(level: string) {
  if (level === "Easy") return "text-green-500";
  if (level === "Medium") return "text-yellow-500";
  return "text-red-500";
}

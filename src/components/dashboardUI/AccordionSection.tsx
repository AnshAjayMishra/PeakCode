'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, ExternalLink } from "lucide-react";

type Question = {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard"; // ✅ fixed type
  link: string;
  completed?: boolean;
};

type Props = {
  title: string;
  questions: Question[];
  onToggle: (topic: string, id: number) => void;
  topicKey: string;
};

export function AccordionSection({ title, questions, onToggle, topicKey }: Props) {
  const total = questions.length;
  const solved = questions.filter((q) => q.completed).length;
  const progress = (solved / total) * 100;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title}>
        <AccordionTrigger className="text-left">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center w-full">
              <span className="text-sm font-medium">{title}</span>
              <span className="text-sm text-muted-foreground">{solved} / {total}</span>
            </div>
            <Progress value={progress} className="mt-2" />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2 mt-3">
            {questions.map((q) => (
              <li
                key={q.id}
                className="flex justify-between items-center px-2 py-1 rounded-md hover:bg-muted"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{q.title}</span>
                  <span className={`text-xs ${getDifficultyColor(q.difficulty)}`}>
                    {q.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={q.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-500"
                    title="Go to LeetCode"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <Checkbox
                    checked={q.completed}
                    onCheckedChange={() => onToggle(topicKey, q.id)}
                  />
                  {q.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function getDifficultyColor(level: "Easy" | "Medium" | "Hard") {
  return level === "Easy"
    ? "text-green-500"
    : level === "Medium"
    ? "text-yellow-500"
    : "text-red-500";
}

'use client';

import { useEffect, useState } from "react";
import { AccordionSection } from "@/components/dashboardUI/AccordionSection";
import { Sidebar } from "@/components/dashboardUI/Sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/darkmode/toggle";
import Image from "next/image";

type Question = {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard"; // ✅ fixed type
  link: string;
  topics: string[];
  companies: string[];
  completed?: boolean;
};

type TopicData = {
  [topic: string]: Question[];
};

type SheetKey = 'A2Z' | 'SDE' | 'Blind75' | 'LC150';

const TOPICS_PER_PAGE = 8;

export default function DashboardPage() {
  const [topics, setTopics] = useState<TopicData>({});
  const [loading, setLoading] = useState(true);
  const [selectedSheet, setSelectedSheet] = useState<SheetKey>('LC150');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leetcode-questions?sheet=${selectedSheet}`)
      .then(res => res.json())
      .then((data) => {
        const processed: TopicData = {};
        for (const topic in data) {
          processed[topic] = data[topic].map((q: Question) => ({ ...q, completed: false }));
        }
        setTopics(processed);
        setLoading(false);
        setCurrentPage(1);
      });
  }, [selectedSheet]);

  const toggleCompleted = (topic: string, id: number) => {
    setTopics(prev => ({
      ...prev,
      [topic]: prev[topic].map(q =>
        q.id === id ? { ...q, completed: !q.completed } : q
      ),
    }));
  };

  const all = Object.values(topics).flat();
  const total = all.length;
  const solved = all.filter(q => q.completed).length;
  const easy = all.filter(q => q.difficulty === "Easy");
  const medium = all.filter(q => q.difficulty === "Medium");
  const hard = all.filter(q => q.difficulty === "Hard");

  const topicEntries = Object.entries(topics);
  const totalPages = Math.ceil(topicEntries.length / TOPICS_PER_PAGE);
  const currentTopics = topicEntries.slice(
    (currentPage - 1) * TOPICS_PER_PAGE,
    currentPage * TOPICS_PER_PAGE
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar selected={selectedSheet} onSelect={(sheet) => setSelectedSheet(sheet)} /> {/* ✅ fixed here */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="pt-6 pb-4 px-4 bg-background flex items-center justify-between border-b border-muted">
          <div className="flex items-center space-x-4">
            <Image
              src="/peakcode.png"
              alt="PeakCode Logo"
              className="h-12 w-12 object-contain rounded-full"
              width={22}
              height={22}
            />
          </div>

          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold tracking-wide whitespace-nowrap">
              LeetCode Top 150
            </h1>
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Progress" value={`${solved} / ${total}`} />
            <StatCard label="Easy" value={`${easy.filter(q => q.completed).length} / ${easy.length}`} />
            <StatCard label="Medium" value={`${medium.filter(q => q.completed).length} / ${medium.length}`} />
            <StatCard label="Hard" value={`${hard.filter(q => q.completed).length} / ${hard.length}`} />
          </section>

          {/* Accordions */}
          <section className="space-y-4">
            {loading ? (
              <p>Loading questions...</p>
            ) : (
              currentTopics.map(([topic, questions]) => (
                <AccordionSection
                  key={topic}
                  title={topic}
                  questions={questions}
                  topicKey={topic}
                  onToggle={toggleCompleted}
                />
              ))
            )}
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center pt-6 space-x-6">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-border hover:bg-muted disabled:opacity-40"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-border hover:bg-muted disabled:opacity-40"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-lg p-4 bg-muted text-center text-muted-foreground">
      <h4 className="text-sm font-medium mb-2">{label}</h4>
      <p className="text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}

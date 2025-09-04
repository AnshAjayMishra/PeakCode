'use client';

import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  NotebookPen,
  Brain,
  ListChecks,
  BookmarkCheck,
} from 'lucide-react';

type SheetKey = 'LC150' | 'A2Z' | 'SDE' | 'Blind75' | 'Love';

type Props = {
  selected: SheetKey;
  onSelect: (sheet: SheetKey) => void;
};

export function Sidebar({ selected, onSelect }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const sheets: { key: SheetKey; label: string; icon: JSX.Element }[] = [
    { key: 'LC150', label: 'LeetCode 150', icon: <BookOpen size={18} /> },
    { key: 'A2Z', label: 'Striver A2Z DSA Sheet', icon: <NotebookPen size={18} /> },
    { key: 'SDE', label: 'NeetCode 150', icon: <Brain size={18} /> },
    { key: 'Blind75', label: 'Blind 75 Sheet', icon: <ListChecks size={18} /> },
    { key: 'Love', label: 'Love Babbar Sheet', icon: <BookmarkCheck size={18} /> },
  ];

  return (
    <div
      className={`relative h-screen transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-60'
      } bg-black border-r border-white/10 overflow-hidden`}
    >
      {/* Toggle Arrow Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 z-10 bg-gray-900 text-white border border-white/10 rounded-full p-1 shadow"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Sheet Menu */}
      <div className="p-4 text-white">
        {!collapsed && <h2 className="text-lg font-bold mb-4">DSA Sheets</h2>}
        <ul className="space-y-2">
          {sheets.map(({ key, label, icon }) => {
            const isActive = selected === key;
            return (
              <li key={key}>
                <button
                  onClick={() => onSelect(key)}
                  className={`group flex items-center w-full px-3 py-2 rounded-md text-left transition-colors relative ${
                    isActive
                      ? 'bg-white/10 font-semibold'
                      : 'hover:bg-white/5'
                  }`}
                >
                  {/* Left white border for active item */}
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-sm" />
                  )}

                  {/* Icon */}
                  <span className="mr-3">{icon}</span>

                  {/* Label (hide when collapsed) */}
                  {!collapsed && (
                    <span className="text-sm font-medium truncate">
                      {label}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

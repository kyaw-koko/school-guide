'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';
import { MajorEnrollmentConfig, QuestStep } from '@/types/enrollment';

interface StickyQuestHeaderProps {
  config: MajorEnrollmentConfig;
  activeQuest: QuestStep;
  completedSubQuests: string[];
  allCompleted: boolean;
  onBackHome: () => void;
  onSelectQuest: (questId: string) => void;
}

export function StickyQuestHeader({
  config,
  activeQuest,
  completedSubQuests,
  allCompleted,
  onBackHome,
  onSelectQuest,
}: StickyQuestHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalQuests = config.quests.length;

  const isQuestDone = (quest: QuestStep) =>
    quest.subQuests.length > 0 &&
    quest.subQuests.every((sq) => completedSubQuests.includes(sq.id));

  const handleJump = (questId: string) => {
    setIsExpanded(false);
    onSelectQuest(questId);
  };

  return (
    <header className="sticky top-0 z-30 bg-light-inverse-surface text-light-inverse-on-surface shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={onBackHome}
          aria-label="Back to home"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-light-inverse-on-surface hover:bg-white/20 shrink-0 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-[18px] h-[18px]" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls="quest-drawer"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex-1 flex items-center justify-between gap-2 text-left min-w-0 cursor-pointer"
        >
          <div className="flex flex-col min-w-0">
            <span className="font-label text-xs font-semibold text-light-inverse-primary uppercase tracking-wide">
              {allCompleted
                ? `${config.questUiCopy.currentQuestPrefix} ${totalQuests}/${totalQuests} · ${config.questUiCopy.statusDone}`
                : `${config.questUiCopy.currentQuestPrefix} ${activeQuest.number}/${totalQuests}`}
            </span>
            <span className="font-body text-xs leading-relaxed py-0.5 text-light-inverse-on-surface truncate">
              {activeQuest.shortTitle}
            </span>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-light-inverse-on-surface shrink-0 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Smooth Accordion Collapsible Quest Overview Drawer */}
      <div
        id="quest-drawer"
        aria-hidden={!isExpanded}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="All quests overview"
            className="border-t border-white/15 px-4 py-3 bg-light-inverse-surface flex flex-col gap-2"
          >
            {config.quests.map((quest) => {
              const done = isQuestDone(quest);
              const isActive = !done && quest.id === activeQuest.id;

              return (
                <button
                  key={quest.id}
                  type="button"
                  tabIndex={isExpanded ? 0 : -1}
                  onClick={() => handleJump(quest.id)}
                  className={`flex items-center justify-between gap-2 py-1.5 px-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-light-inverse-on-surface'
                      : done
                        ? 'text-green-300 hover:bg-white/5'
                        : 'text-light-inverse-on-surface/75 hover:bg-white/5'
                  }`}
                >
                  <span className="font-body text-xs leading-relaxed py-0.5 flex items-center gap-1.5 min-w-0">
                    {done && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" aria-hidden="true" />
                    )}
                    <span className="truncate">
                      {quest.number}. {quest.shortTitle}
                    </span>
                  </span>
                  <span
                    className={`font-mono text-[11px] font-medium shrink-0 ${
                      done
                        ? 'text-green-400'
                        : isActive
                          ? 'text-light-inverse-primary'
                          : 'text-light-inverse-on-surface/50'
                    }`}
                  >
                    {done
                      ? config.questUiCopy.statusDone
                      : isActive
                        ? config.questUiCopy.statusActive
                        : config.questUiCopy.statusPending}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

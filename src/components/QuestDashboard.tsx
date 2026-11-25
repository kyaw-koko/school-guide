'use client';

import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  FileEdit,
  Info,
  MapPin,
  PartyPopper,
  RotateCcw,
} from 'lucide-react';
import {
  AcademicYearOption,
  AppView,
  CampusRouteId,
  MajorEnrollmentConfig,
} from '@/types/enrollment';
import { StickyQuestHeader } from '@/components/StickyQuestHeader';
import { LiveCampusMap } from '@/components/LiveCampusMap';
import { ScienceInteriorBlueprint } from '@/components/ScienceInteriorBlueprint';

interface QuestDashboardProps {
  config: MajorEnrollmentConfig;
  selectedYear: AcademicYearOption;
  selectedRoute: CampusRouteId;
  completedSubQuests: string[];
  onSelectYear: (year: AcademicYearOption) => void;
  onSelectRoute: (route: CampusRouteId) => void;
  onToggleSubQuest: (subQuestId: string) => void;
  onNavigate: (view: AppView) => void;
  onResetProgress: () => void;
}

export function QuestDashboard({
  config,
  selectedYear,
  selectedRoute,
  completedSubQuests,
  onSelectYear,
  onSelectRoute,
  onToggleSubQuest,
  onNavigate,
  onResetProgress,
}: QuestDashboardProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  const isQuestDone = (questIndex: number) => {
    const quest = config.quests[questIndex];
    return (
      quest.subQuests.length > 0 &&
      quest.subQuests.every((sq) => completedSubQuests.includes(sq.id))
    );
  };

  const firstIncompleteIndex = config.quests.findIndex((_, idx) => !isQuestDone(idx));
  const allCompleted = firstIncompleteIndex === -1;
  const activeQuest = allCompleted
    ? config.quests[config.quests.length - 1]
    : config.quests[firstIncompleteIndex];

  const handleSelectQuest = (questId: string) => {
    const el = document.getElementById(questId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOpenPrefillPreview = () => {
    onNavigate('prep');
    setTimeout(() => {
      document
        .getElementById('live-form-preview')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Sticky Collapsible Dark Slate Quest Header */}
      <StickyQuestHeader
        config={config}
        activeQuest={activeQuest}
        completedSubQuests={completedSubQuests}
        allCompleted={allCompleted}
        onBackHome={() => onNavigate('landing')}
        onSelectQuest={handleSelectQuest}
      />

      <main className="flex-1 px-4 py-4 flex flex-col gap-4">
        {/* Year Selector Pills */}
        <section aria-label="Academic year selector" className="flex flex-col gap-2">
          <span className="font-label text-xs font-semibold text-light-on-surface-variant">
            {config.questUiCopy.classYearLabel}
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {config.classYears.map((yr) => {
              const isSelected = selectedYear === yr.id;
              return (
                <button
                  key={yr.id}
                  type="button"
                  onClick={() => onSelectYear(yr.id)}
                  className={`px-3 py-1.5 rounded-full font-label text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-primary text-light-on-primary shadow-sm'
                      : 'bg-light-surface text-light-on-surface-variant border border-light-outline-variant hover:border-blue-primary/50'
                  }`}
                >
                  {yr.labelEn}
                </button>
              );
            })}
          </div>
        </section>

        {/* Live Campus Walking Route Tracker */}
        <LiveCampusMap
          routes={config.campusRoutes}
          selectedRouteId={selectedRoute}
          onSelectRoute={onSelectRoute}
          title={config.questUiCopy.liveMapTitle}
          landmarkBadge={config.questUiCopy.mapLandmarkBadge}
          openFullRouteLabel={config.questUiCopy.openFullRouteLabel}
          fallbackNotice={config.questUiCopy.mapFallbackNotice}
        />

        {/* All Quests Completed Banner */}
        {allCompleted && (
          <div
            role="status"
            className="bg-success-container border border-success/40 rounded-2xl p-4 flex items-start gap-3 text-on-success-container"
          >
            <PartyPopper className="w-6 h-6 text-success shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex flex-col gap-1">
              <p className="font-title text-sm font-bold leading-relaxed">
                {config.questUiCopy.allDoneTitle}
              </p>
              <p className="font-body text-xs leading-relaxed">
                {config.questUiCopy.allDoneSubtitle}
              </p>
            </div>
          </div>
        )}

        {/* 4-Step Vertical Quest Timeline */}
        <section aria-label="Enrollment quests" className="flex flex-col gap-4">
          {config.quests.map((quest, index) => {
            const done = isQuestDone(index);
            const isActive = !done && quest.id === activeQuest.id;
            const location = quest.locationId
              ? config.locations[quest.locationId]
              : undefined;

            return (
              <article
                key={quest.id}
                id={quest.id}
                className={`bg-light-surface rounded-2xl p-4 flex flex-col gap-3 scroll-mt-20 transition-all ${
                  isActive
                    ? 'border-2 border-blue-primary shadow-md'
                    : done
                      ? 'border border-success/50 shadow-sm'
                      : 'border border-light-outline-variant shadow-sm'
                }`}
              >
                <header className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`font-label text-xs font-semibold ${
                          done
                            ? 'text-success'
                            : isActive
                              ? 'text-blue-primary'
                              : 'text-light-on-surface-variant'
                        }`}
                      >
                        QUEST {quest.number} OF {config.quests.length}
                      </span>
                      {done && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success-container text-on-success-container font-label text-[11px] font-semibold">
                          <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                          {config.questUiCopy.statusDone}
                        </span>
                      )}
                      {isActive && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-soft text-blue-ink font-label text-[11px] font-semibold">
                          {config.questUiCopy.statusActive}
                        </span>
                      )}
                    </div>
                    <h2 className="font-title text-[17px] font-bold leading-7 text-light-on-surface py-0.5">
                      {quest.title}
                    </h2>
                    <p className="font-body text-xs leading-relaxed text-light-on-surface-variant">
                      {quest.locationNote}
                    </p>
                  </div>
                </header>

                {/* Alert Box (Library Clearance Note or UAB Pay Only Warning) */}
                {quest.alert && (
                  <div
                    role="alert"
                    className={
                      quest.alert.variant === 'error'
                        ? 'bg-light-error-container border-2 border-light-error/50 rounded-xl p-3 flex items-start gap-2.5 text-light-on-error-container'
                        : 'bg-blue-soft border border-light-outline-variant rounded-xl p-3 flex items-start gap-2.5 text-light-on-surface'
                    }
                  >
                    {quest.alert.variant === 'error' ? (
                      <AlertCircle className="w-5 h-5 text-light-error shrink-0 mt-0.5" aria-hidden="true" />
                    ) : (
                      <Info className="w-[18px] h-[18px] text-blue-primary shrink-0 mt-0.5" aria-hidden="true" />
                    )}
                    <div className="flex flex-col gap-1">
                      {quest.alert.title && (
                        <span className="font-label text-xs font-bold text-light-on-error-container">
                          {quest.alert.title}
                        </span>
                      )}
                      <p className="font-body text-xs leading-relaxed py-0.5 text-pretty">
                        {quest.alert.text}
                      </p>
                    </div>
                  </div>
                )}

                {/* Dark-Mode Architectural CAD Interior Blueprint (Quests 1 & 4) */}
                {quest.interiorDefaultWing && (
                  <ScienceInteriorBlueprint
                    config={config.scienceInterior}
                    defaultWing={quest.interiorDefaultWing}
                  />
                )}

                {/* Sub-quests Checklist */}
                <div className="flex flex-col gap-2">
                  {quest.subQuests.map((sq) => {
                    const checked = completedSubQuests.includes(sq.id);
                    const displayText =
                      selectedYear === 'First Year' && sq.firstYearText
                        ? sq.firstYearText
                        : sq.text;
                    return (
                      <label
                        key={sq.id}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-colors cursor-pointer ${
                          checked
                            ? 'bg-success-container/35 border-success/35'
                            : 'bg-light-surface-container-low border-transparent'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggleSubQuest(sq.id)}
                          className="mt-1.5 w-4 h-4 rounded border-light-outline text-blue-primary focus:ring-blue-primary shrink-0"
                        />
                        <span
                          className={`font-body text-sm leading-relaxed py-0.5 text-pretty ${
                            checked
                              ? 'line-through text-light-on-surface-variant'
                              : 'text-light-on-surface'
                          }`}
                        >
                          {displayText}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Card Footer: Pre-filled Form Shortcut + Google Maps Link */}
                {(quest.subQuests.some((sq) => sq.hasPrefillShortcut) || location) && (
                  <footer className="pt-2.5 border-t border-light-outline-variant flex items-center justify-between gap-2 flex-wrap">
                    {quest.subQuests.some((sq) => sq.hasPrefillShortcut) ? (
                      <button
                        type="button"
                        onClick={handleOpenPrefillPreview}
                        className="inline-flex items-center gap-1.5 font-label text-xs font-semibold text-indigo-accent hover:underline cursor-pointer"
                      >
                        <FileEdit className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{config.questUiCopy.viewPrefilledLabel}</span>
                      </button>
                    ) : (
                      <span />
                    )}

                    {location && (
                      <a
                        href={location.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-soft text-blue-ink font-label text-xs font-semibold hover:bg-blue-primary hover:text-white transition-colors"
                      >
                        <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{location.mapsLabel}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                      </a>
                    )}
                  </footer>
                )}
              </article>
            );
          })}
        </section>

        {/* Reset Progress Section */}
        <section className="pt-2 pb-8 flex flex-col items-center gap-2">
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-light-outline-variant bg-light-surface text-xs font-label font-semibold text-light-on-surface-variant hover:text-light-error hover:border-light-error/50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{config.questUiCopy.resetButtonLabel}</span>
            </button>
          ) : (
            <div className="w-full bg-light-error-container/50 border border-light-error/40 rounded-xl p-3 flex flex-col gap-2 text-center">
              <p className="font-body text-xs leading-relaxed text-light-on-error-container">
                {config.questUiCopy.resetConfirmText}
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-3 py-1.5 rounded-lg bg-light-surface border border-light-outline-variant text-xs font-label font-semibold text-light-on-surface cursor-pointer"
                >
                  မဖျက်ပါ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmReset(false);
                    onResetProgress();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-light-error text-white text-xs font-label font-semibold cursor-pointer"
                >
                  ပြန်စမည် (Reset)
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
